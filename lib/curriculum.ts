import { Assignment, GearProfile, UnitInfo } from "./types";

export const CURRICULUM_UNITS: UnitInfo[] = [
  {
    unitNumber: 1,
    title: "Foundations",
    tagline: "Framing, Shutter/Aperture & Compositional Grammar",
    description:
      "Master essential optical physics, depth-of-field control, shutter angle motion cadences, and foundational framing rules that make every shot intentional.",
    topics: ["Framing & Alignment", "Shutter Speed & 180° Rule", "Aperture & DoF", "Rule of Thirds"],
    accentColor: "amber",
  },
  {
    unitNumber: 2,
    title: "Color & Light",
    tagline: "Directional Window Illuminance & Log Science",
    description:
      "Harness natural directional falloff, inverse-square physics, motivated fill, and establish a color-managed Log-to-Rec.709 grading pipeline on laptop and workstation.",
    topics: ["Directional Window Light", "Negative Fill", "Log Sensor Science", "CST Grading Pipelines"],
    accentColor: "cyan",
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  // =========================================================================
  // UNIT 1: FOUNDATIONS (PHOTOGRAPHY TRACK)
  // =========================================================================
  {
    id: "photo-u1-rule-of-thirds",
    medium: "photography",
    unitNumber: 1,
    difficultyTier: 1,
    title: "Rule of Thirds & Geometric Lead Lines",
    domain: "Composition",
    scale: "micro",
    environment: "home",
    requiredGear: ["Mirrorless Camera or Smartphone (Manual Mode)", "Standard Prime Lens (35mm or 50mm)", "Tripod"],
    promptMarkdown: `### Exercise: The 3x3 Compositional Grid (Stills)

1. **Activate Viewfinder Grid:** Turn on the 3x3 Rule of Thirds overlay in your camera's EVF or rear LCD.
2. **Subject Placement:** Position your primary subject along the right vertical third line, landing the focal point on the upper intersection node.
3. **Leading Lines:** Compose the scene so natural architectural edges (desk edge, doorway, window frame) draw the viewer's eye into the frame.
4. **Deliverable:** Shoot 3 locked-off RAW stills exploring tension between negative space and subject weight.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 20,
  },
  {
    id: "photo-u1-crop-aspect-analysis",
    medium: "photography",
    unitNumber: 1,
    difficultyTier: 1,
    title: "Aspect Ratio & Spatial Crop Dynamics",
    domain: "Visual Analysis",
    scale: "micro",
    environment: "road",
    requiredGear: ["Laptop", "Lightroom Classic / Capture One / Photoshop"],
    promptMarkdown: `### Exercise: Mobile Crop & Spatial Reframing

1. **Archive Ingestion:** Select 3 uncropped RAW wide photos from your travel catalog on your laptop.
2. **Re-framing Matrix:** Create 3 virtual copies of each photo:
   - **4:5 Vertical Portrait Crop:** Optimize balance for editorial or gallery presentation.
   - **16:9 Cinematic Crop:** Challenge horizontal tension and peripheral balance.
   - **1:1 Formal Square Crop:** Evaluate pure center balance and geometric symmetry.
3. **Written Synthesis:** Document in 2-3 sentences which aspect ratio best reinforces the emotional intent of each image.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 25,
  },
  {
    id: "photo-u1-aperture-dof",
    medium: "photography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Aperture Reciprocity & Depth-of-Field Bracketing",
    domain: "Optics & Exposure",
    scale: "micro",
    environment: "home",
    requiredGear: ["Camera with Manual Controls", "Fast Prime Lens (f/1.4 - f/2.8)", "Tripod"],
    promptMarkdown: `### Exercise: Subject Separation vs Environmental Context

1. **Staging:** Place a tabletop object 1 meter from your lens with structured background depth at 3-4 meters.
2. **Shallow Focus (f/1.8):** Expose wide-open at base ISO. Observe the bokeh transition zone and subject isolation.
3. **Mid & Deep Focus (f/5.6 and f/11):** Stop down in full stops, adjusting shutter speed to preserve identical exposure histogram.
4. **Review:** Inspect the edge transition acuity on the focal plane at 100% crop.`,
    prerequisites: ["photo-u1-rule-of-thirds"],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "photo-u1-milestone-triptych",
    medium: "photography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Milestone: 3-Still Fine Art Narrative Triptych",
    domain: "Visual Storytelling",
    scale: "milestone",
    environment: "home",
    requiredGear: ["Camera with Prime Lens", "Tripod", "Calibrated Display or Laptop"],
    promptMarkdown: `### Milestone Project: Cohesive Stills Triptych

Shoot and assemble a 3-image fine art series telling a quiet story within your immediate surroundings:
- **Frame 1 (Wide):** Atmospheric environmental portrait composed with intentional leading geometry.
- **Frame 2 (Medium):** Working shot emphasizing focal isolation through deliberate aperture choice.
- **Frame 3 (Detail/Macro):** High-texture macro/close-up highlighting tactile depth and negative space.

**Evaluation:** All three frames must share a uniform aspect ratio, consistent exposure baseline, and cohesive color palette.`,
    prerequisites: ["photo-u1-rule-of-thirds", "photo-u1-aperture-dof"],
    status: "available",
    estimatedMinutes: 90,
  },

  // =========================================================================
  // UNIT 1: FOUNDATIONS (VIDEOGRAPHY TRACK)
  // =========================================================================
  {
    id: "video-u1-shutter-angle",
    medium: "videography",
    unitNumber: 1,
    difficultyTier: 1,
    title: "180° Shutter Angle Motion Blur Deconstruction",
    domain: "Cinematography",
    scale: "micro",
    environment: "road",
    requiredGear: ["Laptop", "NLE (DaVinci Resolve / Premiere Pro / Final Cut)"],
    promptMarkdown: `### Exercise: Frame Cadence & Shutter Physics

1. **Load Test Clips:** In your laptop NLE, load 24fps test clips shot at various shutter speeds (1/48s cinematic, 1/250s high-speed crispness, 1/15s motion streak).
2. **Frame-by-Frame Scrub:** Step through 10 consecutive frames of a moving hand or passing vehicle.
3. **Edge Analysis:** Measure the blur trail length bridging temporal gaps between frames.
4. **Field Note:** Write a short comparative analysis of 180° motion fluidness versus high-shutter combat/action aesthetics.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 25,
  },
  {
    id: "video-u1-tracking-panning",
    medium: "videography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Dynamic Framing & Motivated Pan Stabilization",
    domain: "Camera Movement",
    scale: "micro",
    environment: "home",
    requiredGear: ["Cinema/Mirrorless Camera", "Fluid Head Tripod or Gimbal", "Standard Lens"],
    promptMarkdown: `### Exercise: Controlled Horizon & Motivated Pan Cadence

1. **Subject Path:** Set a subject walking across your room from left to right over 5 seconds.
2. **Headroom & Lead Room:** Maintain steady head room and lead room (looking room) ahead of the subject throughout the entire motion sweep.
3. **Execution:** Execute 4 passes at 24fps with a 180° shutter (1/48s or 1/50s).
4. **Scrutiny:** Verify there is no micro-jitter or horizon tilt during the deceleration phase.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "video-u1-rough-cut-pacing",
    medium: "videography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Rough Cut Pacing & Shot Duration Audit",
    domain: "Editing & Rhythm",
    scale: "micro",
    environment: "road",
    requiredGear: ["Laptop with NLE", "B-Roll footage library"],
    promptMarkdown: `### Exercise: Editorial Cadence on the Go

1. **Timeline Assembly:** On your laptop NLE, lay out 5 b-roll clips from your archives.
2. **Rhythm Variation:** Edit the sequence to an upbeat rhythm, followed by an contemplative ambient version.
3. **Cut Point Analysis:** Cut on action (e.g., during subject motion or optical transitions) to hide the edit seam.
4. **Export Check:** Export a 15-second cut and verify seamless spatial orientation between cuts.`,
    prerequisites: ["video-u1-shutter-angle"],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "video-u1-milestone-sequence",
    medium: "videography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Milestone: 3-Shot Cinematic Visual Sequence",
    domain: "Directing & Cinematography",
    scale: "milestone",
    environment: "home",
    requiredGear: ["Cinema/Mirrorless Camera", "Prime or Zoom Lens", "Tripod / Handheld Rig", "Variable ND"],
    promptMarkdown: `### Milestone Project: 15-Second Silent Visual Story

Direct, shoot, and edit a continuous 15-second non-verbal visual sequence:
- **Shot 1 (Wide):** Establishing shot firmly adhering to the Rule of Thirds and architectural lines.
- **Shot 2 (Medium):** Subject action shot with smooth motivated camera motion.
- **Shot 3 (Tight Close-Up):** Shallow depth-of-field tactile detail shot wide-open.

Ensure exact 180° shutter discipline across all shots and seamless 180° axis continuity.`,
    prerequisites: ["video-u1-shutter-angle", "video-u1-tracking-panning"],
    status: "available",
    estimatedMinutes: 90,
  },

  // =========================================================================
  // UNIT 2: COLOR & LIGHT (PHOTOGRAPHY TRACK)
  // =========================================================================
  {
    id: "photo-u2-window-fill-portrait",
    medium: "photography",
    unitNumber: 2,
    difficultyTier: 2,
    title: "Directional Window Light & Negative Fill Sculpting",
    domain: "Lighting",
    scale: "micro",
    environment: "home",
    requiredGear: ["Camera with Fast Lens (f/1.8 - f/2.8)", "Diffused Window", "Black Foam-Core or Dark Flag"],
    promptMarkdown: `### Exercise: Chiaroscuro Natural Light Stills

1. **Key Setup:** Seat your subject angled 45° to a diffused daylight window (Rembrandt angle).
2. **Negative Fill:** Position a 30x40" black foam board 0.75m away on the shadow side to eliminate ambient bounce.
3. **Exposure & Contrast:** Expose for highlight skin tones. Ensure deep tonal gradation across cheekbones into shadow.
4. **Comparison Deliverable:** Capture one shot with negative fill and one with white bounce; note shadow density differences.`,
    prerequisites: ["photo-u1-milestone-triptych"],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "photo-u2-raw-tone-curve",
    medium: "photography",
    unitNumber: 2,
    difficultyTier: 2,
    title: "RAW Tone Curve S-Curve & Color Separation Lab",
    domain: "Color Science",
    scale: "micro",
    environment: "road",
    requiredGear: ["Laptop", "Lightroom / Capture One / Photoshop Camera Raw"],
    promptMarkdown: `### Exercise: High-Dynamic-Range RAW Development

1. **Highlight Recovery:** In your mobile catalog, select a high-contrast backlit portrait.
2. **Parametric Curve:** Build a custom S-curve lifting blacks slightly (matte shadow roll-off) while suppressing specular highlight burnout.
3. **Color Balance:** Push subtle warm amber into midtones and cool cyan into deep shadows.
4. **Verification:** Inspect histogram for zero shadow crush or highlight clipping.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "photo-u2-milestone-editorial",
    medium: "photography",
    unitNumber: 2,
    difficultyTier: 3,
    title: "Milestone: High-Contrast Fine Art Editorial Portrait",
    domain: "Portrait Photography",
    scale: "milestone",
    environment: "home",
    requiredGear: ["Camera", "Fast Prime (50mm or 85mm)", "Window Key + Negative Flag", "Laptop for RAW grading"],
    promptMarkdown: `### Milestone Project: Editorial Cover Portrait Series

Produce a magazine-ready portrait series balancing natural light control and color grading:
1. **Lighting Execution:** Set up directional window illuminance with deliberate negative fill to create sharp chiaroscuro facial contours.
2. **RAW Development:** Apply calibrated custom tonal curves, subtle split-toning, and precise skin-tone preservation.
3. **Final Delivery:** Deliver 2 vertical editorial portrait crops formatted with matching contrast ratios and chromatic balance.`,
    prerequisites: ["photo-u2-window-fill-portrait", "photo-u2-raw-tone-curve"],
    status: "available",
    estimatedMinutes: 100,
  },

  // =========================================================================
  // UNIT 2: COLOR & LIGHT (VIDEOGRAPHY TRACK)
  // =========================================================================
  {
    id: "video-u2-log-cst-grading",
    medium: "videography",
    unitNumber: 2,
    difficultyTier: 2,
    title: "Laptop CST Pipeline: Normalizing 10-Bit Log Footage",
    domain: "Color Grading",
    scale: "micro",
    environment: "road",
    requiredGear: ["Laptop", "DaVinci Resolve (Free or Studio)", "Sample 10-Bit Log Footage (S-Log3, C-Log, or BRAW)"],
    promptMarkdown: `### Exercise: Technical Color Space Transform Pipeline

1. **Node Architecture:**
   - **Node 1 (Balance):** Exposure offset and white balance tint/temp adjustment.
   - **Node 2 (Look Adjustments):** Contrast and saturation pivots.
   - **Node 3 (Color Space Transform):** Input Color Space = Camera Sensor Gamut, Input Gamma = Camera Log; Output Color Space = Rec.709, Output Gamma = Gamma 2.4.
2. **Verification:** Inspect the waveform monitor. Verify highlights do not hard-clip at 1023 and skin tone line lies true on the vectorscope.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "video-u2-chiaroscuro-lighting",
    medium: "videography",
    unitNumber: 2,
    difficultyTier: 2,
    title: "Cinematic Chiaroscuro & Motivated Key/Fill Ratio",
    domain: "Cinematic Lighting",
    scale: "micro",
    environment: "home",
    requiredGear: ["Camera with Log Profile", "Window Light or Bi-Color LED", "Negative Flag (Black Sheet or Foam-Core)"],
    promptMarkdown: `### Exercise: 4:1 Dramatic Contrast Lighting Ratio

1. **Key Light:** Angle subject 45° to key source so far-side eye receives Rembrandt light triangle.
2. **Negative Flag:** Position black flag on camera-facing side to establish dark, cinematic shadows (4:1 contrast ratio).
3. **Log Exposure:** Expose subject's key skin highlight to IRE 55-60 in S-Log3 / C-Log.
4. **Deliverable:** Record an 8-second slow-motion locked shot (60fps played back at 24fps) examining facial contour stability.`,
    prerequisites: ["video-u1-milestone-sequence"],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "video-u2-skin-vector-isolation",
    medium: "videography",
    unitNumber: 2,
    difficultyTier: 3,
    title: "Secondary Color Isolation & Skin Tone Vectorscope",
    domain: "Color Grading",
    scale: "micro",
    environment: "road",
    requiredGear: ["Laptop with Calibrated Display", "DaVinci Resolve / Premiere Lumetri"],
    promptMarkdown: `### Exercise: Protective Skin Isolation in Mobile NLE

1. **Vectorscope Analysis:** Isolate subject face with a power window / HSL qualifier.
2. **Skin Indicator Line:** Verify skin hue sits precisely along the 10:30 angle skin indicator vector line.
3. **Background Hue Separation:** Cool the background shadows toward teal/slate without contaminating the warmth of the facial mask.
4. **Deliverable:** Export a before/after split screen still showing the isolated skin mask alongside the full graded frame.`,
    prerequisites: ["video-u2-log-cst-grading"],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "video-u2-milestone-cinematic-look",
    medium: "videography",
    unitNumber: 2,
    difficultyTier: 3,
    title: "Milestone: Chiaroscuro Cinematic Vignette & Master Grade",
    domain: "Cinematography & Color",
    scale: "milestone",
    environment: "home",
    requiredGear: ["Cinema/Mirrorless Camera (Log)", "Fast Prime Lens", "Window Light + Negative Flag", "Laptop/Workstation NLE"],
    promptMarkdown: `### Milestone Project: High-Contrast Cinematic Short Vignette

Execute an end-to-end production loop combining directional natural lighting with advanced Log color mastering:
1. **Shooting (Home Studio):** Record a 20-second cinematic portrait clip in 10-bit Log utilizing indirect window lighting and deliberate negative fill for rich shadow sculpting.
2. **Post-Production (Grading):** Execute a complete node-based CST grade: accurate white balance, highlight roll-off curve, and balanced contrast.
3. **Master Export:** Render a 4K ProRes/H.265 clip complete with a 5-second side-by-side wipe showing the uncorrected raw Log sensor data next to the final graded image.`,
    prerequisites: ["video-u2-chiaroscuro-lighting", "video-u2-log-cst-grading"],
    status: "available",
    estimatedMinutes: 120,
  },
];

export const DEFAULT_GEAR_PROFILE: GearProfile = {
  name: "Strags Studio & Travel Gear Setup",
  cameras: ["Canon EOS R5 MARK II", "Fujifilm X100VI", "Hasselblad X2D 100C", "Canon AE-1 Program 35mm Film Camera"],
  lenses: ["Canon RF 24-70mm f/2.8L IS USM", "Canon RF 15-35mm f/2.8L IS USM", "Hasselblad XCD 90mm f/2.5 V Lens (Hasselblad X)", "Hasselblad XCD 28mm f/4 P Lens"],
  lighting: [
    "NANLITE FS-300B LED BI-COLOR SPOT LIGHT", 
    "IMPACT 45 UMBRELLA BLK/WHT W/REMOVABLE COVER",
    "IMPACT 9.5' HD AIR-CUSHIONED LIGHT STAND- BLACK",
    "Solid Black Foam-Core Flags (Negative Fill)",
    "IMPACT 15LB CORDURA SADDLE SANDBAG - BLK"
  ],
  accessories: [
    "NISI 82MM SWIFT VND MIST KIT 1-9 STOPS",
    "Leofoto MT-03 Spider Tabletop Tripod & LH-25 Mini Ball Head",
    "Manfrotto 290 Tripod with Quick Release Ball Head",
    "Rode VideoMic-R Microphone",
  ],
  editingSetup: {
    hardware: "Mac Studio M4 Max with 32-Core GPU & 64GB RAM; XPS 16 DA16260 OLED 16 Laptop Computer - Graphite",
    monitors: "ASUS ProArt PA32DC 32” 4K OLED HDR Monitor",
    software: ["Adobe Lightroom Classic", "Adobe Premiere Pro"],
  },
  portableKit: [
    "XPS 16 DA16260 OLED 16 Laptop Computer - Graphite",
    "Canon AE-1 Program 35mm Film Camera",
    "Fujifilm X100VI",
    "Iphone 17 Pro Max",
    "4TB Portable SSD (USB-C)",
    "Airpods 5th Gen",
    "DJI Mic 3 2-Person Compact Wireless Microphone System (2x Transmitters, 1x Receiver)",
    "INSTA360 ACE PRO 2 ACTION CAM BDL",
  ],
  studioKit: [
    "Mac Studio M4 Max with 32-Core GPU & 64GB RAM",
    "Sony 1000X M4 Wireless Noise-Canceling Headphones",
    "Canon EOS R5 MARK II",
    "Canon RF 24-70mm f/2.8L IS USM Lens",
    "Canon RF 15-35mm f/2.8L IS USM Lens",
    "Hasselblad XCD 90mm f/2.5 V Lens (Hasselblad X)",
    "Hasselblad XCD 28mm f/4 P Lens",
    "Fujifilm X100VI",
    "Hasselblad X2D 100C",
    "4TB Portable SSD (USB-C)",
    "DJI RS 5 Gimbal Combo Kit with AI Tracking Module & Briefcase Handle",
    "AUDIOTECH AT2020USBX PRO CARD MICROPHONE",
  ],
};
