import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { DEFAULT_GEAR_PROFILE, CURRICULUM_UNITS } from "@/lib/curriculum";
import { Assignment, MediumTrack, Environment } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const medium: MediumTrack = body.medium || "photography";
    const environment: Environment = body.environment || "home";
    const unitNumber: number = Number(body.unitNumber) || 1;
    const difficultyTier = body.difficultyTier || 2;
    const focusTopic: string = body.focusTopic || "";

    const unitInfo =
      CURRICULUM_UNITS.find((u) => u.unitNumber === unitNumber) ||
      CURRICULUM_UNITS[0];

    // Filter available gear based on environment
    const availableGear =
      environment === "road"
        ? DEFAULT_GEAR_PROFILE.portableKit
        : DEFAULT_GEAR_PROFILE.studioKit;

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    let generatedAssignment: Assignment | null = null;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `You are an elite master director of photography and cinematography educator for Strags Studio.
Generate a structured, highly sophisticated professional bite-sized micro-challenge for a creator with advanced skills.

Parameters:
- Track: ${medium.toUpperCase()}
- Environment: ${environment === "road" ? "ON THE ROAD (Mobile / Laptop / Minimalist Kit)" : "AT HOME STUDIO (Full Studio / Rigging / Master Hardware)"}
- Unit ${unitNumber}: "${unitInfo.title}" - ${unitInfo.tagline}
- Unit Topics: ${unitInfo.topics.join(", ")}
- Target Difficulty Tier: Tier ${difficultyTier} (Advanced professional)
${focusTopic ? `- Specific Focus Topic: ${focusTopic}` : ""}

Available Gear Inventory for this Environment (${environment}):
${availableGear.map((g) => `- ${g}`).join("\n")}
Full Roster Context:
- Cameras: ${DEFAULT_GEAR_PROFILE.cameras.join(", ")}
- Lenses: ${DEFAULT_GEAR_PROFILE.lenses.join(", ")}
- Lighting/Grip: ${DEFAULT_GEAR_PROFILE.lighting.join(", ")}
- Audio: ${DEFAULT_GEAR_PROFILE.audio?.join(", ") || "Standard"}
- Support/Motion: ${DEFAULT_GEAR_PROFILE.supportAndMotion?.join(", ") || "Standard"}
- Post Software: ${DEFAULT_GEAR_PROFILE.editingSetup.software.join(", ")} on ${DEFAULT_GEAR_PROFILE.editingSetup.hardware}

Requirements:
1. The challenge must strictly use only gear available in this ${environment} environment.
2. The challenge must be tailored specifically for ${medium}.
3. The promptMarkdown must include:
   - "### Exercise: [Descriptive Technical Title]"
   - Step 1: Technical Setup & Calibration
   - Step 2: Optical / Acoustic / Lighting Execution
   - Step 3: Analysis / Verification Metrics
   - Deliverable definition with concrete qualitative/quantitative benchmarks
4. Return ONLY a valid JSON object matching the requested schema.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "object",
              properties: {
                id: { type: "string" },
                medium: { type: "string", enum: ["photography", "videography"] },
                unitNumber: { type: "integer" },
                difficultyTier: { type: "integer" },
                title: { type: "string" },
                domain: { type: "string" },
                scale: { type: "string", enum: ["micro", "milestone"] },
                environment: { type: "string", enum: ["road", "home"] },
                requiredGear: {
                  type: "array",
                  items: { type: "string" },
                },
                promptMarkdown: { type: "string" },
                prerequisites: {
                  type: "array",
                  items: { type: "string" },
                },
                estimatedMinutes: { type: "integer" },
              },
              required: [
                "id",
                "medium",
                "unitNumber",
                "difficultyTier",
                "title",
                "domain",
                "scale",
                "environment",
                "requiredGear",
                "promptMarkdown",
                "prerequisites",
                "estimatedMinutes",
              ],
            },
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          generatedAssignment = {
            ...parsed,
            id: `gen-${medium}-${environment}-u${unitNumber}-${Date.now().toString(36)}`,
            status: "available",
          };
        }
      } catch (geminiError) {
        console.warn("Gemini 2.5 Flash SDK call failed or returned error, using fallback generator:", geminiError);
      }
    }

    // High-fidelity fallback generator if API key is not present or rate-limited
    if (!generatedAssignment) {
      generatedAssignment = createDynamicFallbackChallenge(medium, environment, unitNumber, difficultyTier);
    }

    return NextResponse.json({
      success: true,
      assignment: generatedAssignment,
      source: apiKey ? "gemini-2.5-flash" : "context-engine-fallback",
    });
  } catch (error) {
    console.error("Error in generate-challenge route:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate challenge" },
      { status: 500 }
    );
  }
}

function createDynamicFallbackChallenge(
  medium: MediumTrack,
  environment: Environment,
  unitNumber: number,
  tier: number
): Assignment {
  const timestamp = Date.now().toString(36);
  const id = `gen-${medium}-${environment}-u${unitNumber}-${timestamp}`;

  if (medium === "photography") {
    if (environment === "road") {
      return {
        id,
        medium: "photography",
        unitNumber,
        difficultyTier: (tier as 1 | 2 | 3) || 2,
        title: "Dynamic Street Geometry & Film Grain Texture Study",
        domain: "Documentary Optics",
        scale: "micro",
        environment: "road",
        requiredGear: [
          "Fujifilm X100VI or Canon AE-1 Program",
          "Built-in 4-Stop ND / NiSi Swift Filter",
          "Dell XPS 16 OLED Laptop",
        ],
        promptMarkdown: `### Exercise: High-Latitude Street Tonal Compression

1. **Optical Configuration:** On your portable travel kit (Fujifilm X100VI or Canon AE-1), engage manual focus with focus peaking or split-image rangefinder.
2. **Shadow Sizing:** Find a high-contrast corridor or urban alley during mid-day sunlight. Expose for highlight specular reflection while maintaining Zone IV shadow edge detail.
3. **Leaf Shutter Sync:** Fire at 1/1000s wide open at f/2.0 to freeze pedestrian motion without focal-plane curtain distortion.
4. **Deliverable:** Ingest into Lightroom on your Dell XPS 16 OLED; evaluate tonal micro-contrast in deep shadows without noise elevation.`,
        prerequisites: [],
        status: "available",
        estimatedMinutes: 25,
      };
    } else {
      return {
        id,
        medium: "photography",
        unitNumber,
        difficultyTier: (tier as 1 | 2 | 3) || 3,
        title: "Medium Format Micro-Contrast & Nanlite 300W Rim Feathering",
        domain: "Fine Art Lighting",
        scale: "micro",
        environment: "home",
        requiredGear: [
          "Hasselblad X2D 100C",
          "Hasselblad XCD 90mm f/2.5 V Lens",
          "NANLITE FS-300B LED Spot Light",
          "Solid Black Foam-Core Flags",
          "Manfrotto 290 Tripod",
        ],
        promptMarkdown: `### Exercise: 16-Bit Chiaroscuro Texture Isolation

1. **Light Positioning:** Mount the Nanlite FS-300B at 5600K 120° behind the subject as an acute rim/kicker light. Position a black foam-core flag 0.5m in front to absorb bounced floor spill.
2. **Medium Format Plane:** Mount the Hasselblad X2D 100C on the Manfrotto 290. Lock focus manually using 100% EVF magnification on the eye or tactile object edge.
3. **Exposure Threshold:** Expose at base ISO 64, f/5.6, 1/250s leaf shutter to keep the background pitch black while skin or ceramic edge catches an ethereal 3-stop rim separation.
4. **Deliverable:** Verify 100MP resolving sharpness on the ASUS ProArt PA32DC OLED display; inspect for zero fringe flare along high-contrast boundaries.`,
        prerequisites: [],
        status: "available",
        estimatedMinutes: 40,
      };
    }
  } else {
    // Videography
    if (environment === "road") {
      return {
        id,
        medium: "videography",
        unitNumber,
        difficultyTier: (tier as 1 | 2 | 3) || 2,
        title: "Mobile 10-Bit C-Log2 CST Node Normalization & Waveform Audit",
        domain: "Post-Production Grading",
        scale: "micro",
        environment: "road",
        requiredGear: [
          "Dell XPS 16 DA16260 OLED Laptop",
          "Adobe Premiere Pro",
          "4TB Portable Rugged NVMe SSD",
          "AirPods (5th Gen)",
        ],
        promptMarkdown: `### Exercise: Technical Color Pipeline on the Go

1. **Color Engine Setup:** Launch Adobe Premiere Pro on the Dell XPS 16 OLED. Create a Rec.709 sequence with C-Log2 Cinema Gamut 10-bit rushes from your 4TB SSD.
2. **Lumetri Architecture:**
   - Pre-LUT Node: Balance exposure offset and white balance (Kelvin/Tint).
   - Technical Transform: Map Cinema Gamut / C-Log2 to Rec.709 Gamma 2.4.
   - Post-LUT Node: Fine-tune contrast pivot and highlight knee.
3. **Acoustic Check:** Clean scratch audio using Premiere Essential Sound dialogue enhancement, auditioning on AirPods.
4. **Deliverable:** Export a 15-second ProRes or H.265 Master with zero highlight clipping above 100 IRE.`,
        prerequisites: [],
        status: "available",
        estimatedMinutes: 30,
      };
    } else {
      return {
        id,
        medium: "videography",
        unitNumber,
        difficultyTier: (tier as 1 | 2 | 3) || 3,
        title: "DJI RS 5 Kinetic Low-to-High Pedestal Tracking with C-Log2",
        domain: "Camera Movement & Directing",
        scale: "micro",
        environment: "home",
        requiredGear: [
          "Canon EOS R5 MARK II",
          "Canon RF 15-35mm f/2.8L IS USM Lens",
          "DJI RS 5 Gimbal Combo Kit with AI Tracking Module",
          "NANLITE FS-300B Spot Light",
        ],
        promptMarkdown: `### Exercise: Dynamic 3-Axis AI Follow & Multi-Axis Elevation

1. **Rig Rigging:** Mount Canon R5 Mark II with RF 15-35mm @ 20mm onto the DJI RS 5. Attach the briefcase handle for two-handed stabilization.
2. **AI Module Setup:** Lock subject tracking with the AI module. Dial Nanlite FS-300B to 4500K motivated warm rim.
3. **The Kinetic Move:** Start in low-mode (briefcase carry) skimming floor height 10cm above surface, accelerating forward and rising to eye level over 6 seconds while subject steps backward.
4. **Deliverable:** Capture 3 takes at 4K DCI Fine 23.98p C-Log2. Verify that horizon tilt remains within ±0.2° and subject framing remains centered throughout the pedestal rise.`,
        prerequisites: [],
        status: "available",
        estimatedMinutes: 45,
      };
    }
  }
}
