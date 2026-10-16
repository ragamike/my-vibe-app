import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { CURRICULUM_UNITS, DEFAULT_GEAR_PROFILE } from "@/lib/curriculum";
import { Assignment, MediumTrack, Environment } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    // Verify Vercel Cron secret if configured
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    const tracks: MediumTrack[] = ["photography", "videography"];
    const envs: Environment[] = ["home", "road"];
    const refreshedChallenges: Assignment[] = [];

    // Cycle through tracks and environments to produce daily rotational challenges
    for (const medium of tracks) {
      for (const environment of envs) {
        // Pick an active unit to refresh (e.g. Unit 1 or 2 rotation)
        const unitNumber = Math.floor(Math.random() * CURRICULUM_UNITS.length) + 1;
        const unitInfo =
          CURRICULUM_UNITS.find((u) => u.unitNumber === unitNumber) ||
          CURRICULUM_UNITS[0];

        const availableGear =
          environment === "road"
            ? DEFAULT_GEAR_PROFILE.portableKit
            : DEFAULT_GEAR_PROFILE.studioKit;

        if (apiKey) {
          try {
            const ai = new GoogleGenAI({ apiKey });
            const prompt = `You are an elite director of photography creating a fresh daily micro-challenge.
Track: ${medium.toUpperCase()}
Environment: ${environment.toUpperCase()}
Unit: ${unitInfo.title} (${unitInfo.tagline})
Available Gear:
${availableGear.join(", ")}

Generate a single focused, rigorous, professional micro-challenge strictly formatted as JSON.`;

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
              refreshedChallenges.push({
                ...parsed,
                id: `cron-${medium}-${environment}-${Date.now().toString(36)}`,
                status: "available",
              });
            }
          } catch (e) {
            console.warn(`Cron Gemini generation failed for ${medium}/${environment}:`, e);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Daily background refresh executed successfully",
      timestamp: new Date().toISOString(),
      refreshedCount: refreshedChallenges.length,
      challenges: refreshedChallenges,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof (error as { digest: unknown }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_")
    ) {
      throw error;
    }
    console.error("Cron refresh handler error:", error);
    return NextResponse.json(
      { success: false, error: "Cron refresh execution failed" },
      { status: 500 }
    );
  }
}
