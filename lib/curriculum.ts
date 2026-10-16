import { Assignment, GearProfile, UnitInfo } from "./types";

export const CURRICULUM_UNITS: UnitInfo[] = [
  {
    unitNumber: 1,
    title: "Foundations & Optics",
    tagline: "Medium-Format Resolving Dynamics, Leaf Shutter Physics & Spatial Compression",
    description:
      "Master the optical physics of 100MP medium-format resolving thresholds, leaf shutter flash/ambient sync, angular spatial compression across 15mm-90mm focal lengths, and rigorous analog exposure discipline.",
    topics: [
      "100MP Medium Format Resolving Acuity",
      "Spatial Compression (15mm vs 90mm)",
      "Leaf Shutter vs Focal Plane Physics",
      "Analog Exposure Reciprocity (Canon AE-1)",
    ],
    accentColor: "amber",
  },
  {
    unitNumber: 2,
    title: "Color & Light",
    tagline: "Directional Bi-Color Sculpting, C-Log2/HNCS Science & Diffusion Optics",
    description:
      "Harness 300W continuous bi-color point sources, negative fill ratios, NiSi Swift mist dispersion, and explore the mathematical nuances of Hasselblad Natural Colour Solution (HNCS) and Canon C-Log2.",
    topics: [
      "Nanlite FS-300B Modified Key & Flag Ratios",
      "HNCS 16-Bit & C-Log2 Sensor Headroom",
      "NiSi Swift VND + Mist Halation Control",
      "Bi-Color Mixed Temperature Harmony",
    ],
    accentColor: "cyan",
  },
  {
    unitNumber: 3,
    title: "Post-Production & Color",
    tagline: "Master OLED Calibration, 16-Bit RAW Sculpting & Lumetri C-Log Pipelines",
    description:
      "Establish reference color pipelines on the ASUS ProArt 4K OLED HDR monitor and mobile Dell XPS 16 OLED display. Master parametric tone curves, LAB color separation, and Rec.709 master exports in Lightroom and Premiere Pro.",
    topics: [
      "ASUS ProArt PA32DC OLED D65 Calibration",
      "Lightroom Classic Calibration & Color Grading",
      "Premiere Pro Lumetri C-Log2 Normalization",
      "Skin Tone Vector Isolation & LUT Hygiene",
    ],
    accentColor: "emerald",
  },
  {
    unitNumber: 4,
    title: "Audio Engineering",
    tagline: "Dual-Transmitter Gain Staging, Cardioid Studio Capture & -14 LUFS Mastering",
    description:
      "Capture broadcast-grade acoustic clarity across studio and road contexts using the Audio-Technica AT2020USB-X cardioid microphone, DJI Mic 3 wireless transmitters, and Premiere Pro Essential Sound restoration.",
    topics: [
      "DJI Mic 3 Dual-Transmitter Gain Staging",
      "Audio-Technica AT2020USB-X Voiceover Studio Setup",
      "Rode VideoMic-R On-Camera Directional Capture",
      "Spectral Denoise & EBU R128 / -14 LUFS Delivery",
    ],
    accentColor: "purple",
  },
  {
    unitNumber: 5,
    title: "Storytelling & Motion",
    tagline: "Motorized 3-Axis Gimbal Cadence, AI Tracking & Dynamic Visual Beats",
    description:
      "Translate emotional intent into deliberate kinetic energy. Master the DJI RS 5 3-axis motorized gimbal with AI tracking module, briefcase low-angle tracking, focal-length pacing, and match cutting on action.",
    topics: [
      "DJI RS 5 Balance Tuning & AI Follow Module",
      "Multi-Lens Shot Progression (15mm to 90mm)",
      "Briefcase Low-Angle Kinetic Pacing",
      "Match Cutting on Action & Visual Rhythm",
    ],
    accentColor: "rose",
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  // =========================================================================
  // UNIT 1: FOUNDATIONS & OPTICS (PHOTOGRAPHY TRACK)
  // =========================================================================
  {
    id: "photo-u1-medium-format-acuity",
    medium: "photography",
    unitNumber: 1,
    difficultyTier: 3,
    title: "100MP Medium Format Resolving Acuity & Diffraction Thresholds",
    domain: "Optical Physics",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Hasselblad X2D 100C",
      "Hasselblad XCD 90mm f/2.5 V Lens",
      "Manfrotto 290 Tripod with Ball Head",
    ],
    promptMarkdown: `### Advanced Laboratory: 100-Megapixel Resolving Limits & Micro-Contrast

With a 100-megapixel medium-format sensor (3.76μm pixel pitch), diffraction becomes optically measurable earlier than on lower-resolution cameras.

1. **Rig Rigidity:** Lock the Hasselblad X2D 100C onto the Manfrotto 290 Tripod. Use the electronic shutter or 2-second self-timer to eliminate mechanical vibration.
2. **Target Staging:** Frame a textured planar subject (fine architectural brickwork, banknote engraving, or precision watch movement) exactly 2.5 meters away with the XCD 90mm f/2.5 V.
3. **Aperture Bracketing Series:** Capture 5 RAW (3FR) exposures: f/2.5, f/4, f/8 (sweet spot), f/14, and f/22 (deep diffraction).
4. **100% & 200% Inspection on Mac Studio / ProArt OLED:**
   - Measure center and corner MTF edge sharpness.
   - Note the exact f-stop where Airy disk overlap softens high-frequency micro-contrast.
5. **Technical Log:** Document the optimal working aperture range (f/4 to f/9) for commercial editorial print masters.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "photo-u1-spatial-compression",
    medium: "photography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Spatial Perspective Compression: 28mm Wide vs 90mm Telephoto",
    domain: "Compositional Geometry",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Hasselblad X2D 100C or Canon EOS R5 Mark II",
      "Hasselblad XCD 28mm f/4 P (or Canon RF 15-35mm)",
      "Hasselblad XCD 90mm f/2.5 V (or Canon RF 24-70mm @ 70mm)",
    ],
    promptMarkdown: `### Exercise: Geometric Perspective Decoupling

Perspective distortion is entirely a function of camera-to-subject distance, not lens focal length.

1. **Fixed Subject Sizing:** Place a foreground bust or still-life object in your studio space.
2. **Shot A (Wide 28mm):** Move close to frame the subject filling the vertical center third. Observe the dramatic volumetric exaggeration and exaggerated background distance.
3. **Shot B (Telephoto 90mm):** Step back to match the exact physical subject size in the viewfinder. Observe how the background elements rush forward, compressing depth planes.
4. **Analysis:** Compare edge straightness, horizon convergence, and emotional proximity between both images.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "photo-u1-leaf-shutter-sync",
    medium: "photography",
    unitNumber: 1,
    difficultyTier: 3,
    title: "Leaf Shutter High-Speed Sync & Ambient Balancing",
    domain: "Strobe / Ambient Dynamics",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Hasselblad X2D 100C (Leaf Shutter) or Fujifilm X100VI",
      "NANLITE FS-300B LED Spot Light",
      "Impact 45\" Umbrella Black/White with Cover",
      "Impact 9.5' Air-Cushioned Light Stand + Sandbag",
    ],
    promptMarkdown: `### Advanced Exercise: Zero Rolling Shutter & 1/2000s Ambient Kill

Unlike traditional focal plane curtains limited to 1/250s flash sync, your Hasselblad XCD lenses and Fujifilm X100VI feature integral leaf shutters capable of full sync up to 1/2000s or 1/4000s.

1. **Setup:** Position the Nanlite FS-300B through the Impact 45" Umbrella at 100% output 1.5m from your subject in a sunlit room.
2. **Focal Plane Comparison:** On a focal plane camera at 1/250s, ambient daylight washes out shadows.
3. **Leaf Shutter Ambient Overpower:** Set your leaf shutter camera to 1/2000s, f/2.8, base ISO 64.
4. **Result:** The ambient daylight is suppressed by 3 full stops, leaving pure directional key illumination without banding, flash sync cords, or HSS power penalty.`,
    prerequisites: ["photo-u1-medium-format-acuity"],
    status: "available",
    estimatedMinutes: 40,
  },
  {
    id: "photo-u1-analog-reciprocity",
    medium: "photography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Analog Exposure Discipline & Manual Light Metering",
    domain: "Analog Photography",
    scale: "micro",
    environment: "road",
    requiredGear: [
      "Canon AE-1 Program 35mm Film Camera",
      "Canon FD 50mm f/1.8 Lens",
      "Roll of 35mm B&W or Color Negative Film (e.g., Tri-X 400 or Portra 400)",
      "Dell XPS 16 OLED Laptop (for log documentation)",
    ],
    promptMarkdown: `### Field Exercise: Zero Chimping Analog Precision

Shooting manual analog film removes digital screen crutches and trains instantaneous exposure calculation.

1. **Manual Metering:** Switch the Canon AE-1 Program to full manual shutter and manual aperture (take aperture off 'A').
2. **Incident vs Reflective Assessment:** Evaluate scene highlights and midtones using the Sunny 16 rule and the AE-1 needle meter.
3. **Zone System Framing:** Rate shadow detail at Zone III (1.5 stops over meter reading for shadow density) to preserve grain integrity on negative film.
4. **Execution:** Take 6 deliberate handheld frames during an afternoon walk with zero burst shooting.
5. **Field Log:** Document frame number, shutter, aperture, and estimated lighting conditions on your Dell XPS 16.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 45,
  },
  {
    id: "photo-u1-milestone-medium-format",
    medium: "photography",
    unitNumber: 1,
    difficultyTier: 3,
    title: "Milestone: Medium-Format Fine Art Architectural Diptych",
    domain: "Fine Art Photography",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Hasselblad X2D 100C",
      "Hasselblad XCD 28mm f/4 P Lens",
      "Hasselblad XCD 90mm f/2.5 V Lens",
      "Manfrotto 290 Tripod",
      "Mac Studio M4 Max + ASUS ProArt PA32DC OLED",
    ],
    promptMarkdown: `### Milestone Project: Dual-Lens Architectural Geometry & Texture

Create a cohesive 2-image fine art exhibition diptych showcasing extreme wide geometry and high-frequency tactile texture:

- **Image 1 (Structural Wide):** Shot with the XCD 28mm f/4 P on the Manfrotto tripod. Strict vertical alignment with ±0.2° horizon accuracy, leveraging 15 stops of dynamic range to retain deep shadow accents and sunlit architectural stone.
- **Image 2 (Tactile Detail):** Shot with the XCD 90mm f/2.5 V at f/5.6. High-contrast micro-texture capturing material craftsmanship, isolated with natural falloff.

**Deliverable:** Ingest into Lightroom Classic on the Mac Studio M4 Max. Review on the ASUS ProArt 4K OLED at 100% crop, ensuring zero optical flare, zero chromatic fringing, and identical color temperature.`,
    prerequisites: ["photo-u1-medium-format-acuity", "photo-u1-spatial-compression"],
    status: "available",
    estimatedMinutes: 120,
  },

  // =========================================================================
  // UNIT 1: FOUNDATIONS & OPTICS (VIDEOGRAPHY TRACK)
  // =========================================================================
  {
    id: "video-u1-r5m2-shutter-cadence",
    medium: "videography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Canon R5 Mark II 180° Shutter Angle & Sensor Readout Speed",
    domain: "Cinematography",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Canon EOS R5 MARK II",
      "Canon RF 24-70mm f/2.8L IS USM Lens",
      "NiSi 82mm Swift VND Mist Kit",
      "Manfrotto 290 Tripod",
    ],
    promptMarkdown: `### Laboratory: Rolling Shutter vs 180° Cinematic Motion

1. **Resolution & Sensor Mode:** Configure the Canon EOS R5 Mark II to 4K DCI Fine (oversampled from 8K sensor) at 23.98p in C-Log2.
2. **Shutter Discipline:** Lock shutter speed to exactly 1/50s (180° shutter equivalent). Thread the NiSi 82mm Swift VND to maintain wide aperture (f/2.8) in ambient light.
3. **Rolling Shutter Stress Test:** Execute rapid lateral whip pans across vertical door frames and window panes. Observe the accelerated sensor readout of the back-illuminated stacked sensor.
4. **Compare:** Contrast motion blur smear against an unnatural 1/500s combat stutter.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "video-u1-rough-cut-audit",
    medium: "videography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Rough Cut Pacing & Shot Duration Audit in Premiere Pro",
    domain: "Editing & Rhythm",
    scale: "micro",
    environment: "road",
    requiredGear: [
      "Dell XPS 16 DA16260 OLED Laptop",
      "4TB Portable SSD (USB-C)",
      "Adobe Premiere Pro",
      "AirPods (5th Gen)",
    ],
    promptMarkdown: `### Mobile Editing Exercise: Micro-Pacing & Cutting on Action

1. **Ingest Archive Footage:** In Premiere Pro on your Dell XPS 16 OLED, import 6 b-roll clips from your 4TB rugged SSD.
2. **Temporal Cadence:** Assemble a 15-second cut exploring two contrasting rhythms:
   - **Rhythm A (Meditative):** 4-5 second average shot duration, cutting on breathing or visual stillness.
   - **Rhythm B (Kinetic):** 1.2 second average shot duration, strictly cutting on subject motion vectors.
3. **Verify:** Check playback smoothness on the OLED display and ensure cuts maintain spatial orientation without jarring visual jumps.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "video-u1-milestone-sequence",
    medium: "videography",
    unitNumber: 1,
    difficultyTier: 2,
    title: "Milestone: 3-Shot Cinematic Sequence with Dual RF Glass",
    domain: "Directing & Cinematography",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Canon EOS R5 MARK II",
      "Canon RF 15-35mm f/2.8L IS USM Lens",
      "Canon RF 24-70mm f/2.8L IS USM Lens",
      "NiSi 82mm Swift VND Mist Kit",
      "Manfrotto 290 Tripod",
    ],
    promptMarkdown: `### Milestone Project: 15-Second Silent Narrative Sequence

Direct, shoot, and edit a continuous 15-second visual story with intentional lens progression:
- **Shot 1 (Extreme Wide 15mm):** Establishing shot capturing spatial scale and architectural environment with the RF 15-35mm.
- **Shot 2 (Medium 35mm):** Subject entering frame and engaging with an intentional task.
- **Shot 3 (Tight Close-Up 70mm):** High-texture tactile macro shot with the RF 24-70mm wide open at f/2.8 with NiSi black mist blooming.

Ensure exact 180° shutter discipline, calibrated exposure in C-Log2, and seamless 180° line-of-action continuity.`,
    prerequisites: ["video-u1-r5m2-shutter-cadence"],
    status: "available",
    estimatedMinutes: 90,
  },

  // =========================================================================
  // UNIT 2: COLOR & LIGHT (PHOTOGRAPHY TRACK)
  // =========================================================================
  {
    id: "photo-u2-nanlite-directional",
    medium: "photography",
    unitNumber: 2,
    difficultyTier: 2,
    title: "Nanlite FS-300B 300W Bi-Color Key & Negative Fill Sculpting",
    domain: "Studio Lighting",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "NANLITE FS-300B LED Bi-Color Spot Light",
      "Impact 45\" Umbrella Black/White with Cover",
      "Impact 9.5' Air-Cushioned Light Stand + Sandbag",
      "Solid Black Foam-Core Flags",
      "Hasselblad X2D 100C or Canon EOS R5 Mark II",
    ],
    promptMarkdown: `### Lighting Masterclass: 4:1 High-Contrast Chiaroscuro Portraiture

1. **Key Setup:** Mount the Nanlite FS-300B to the Impact 9.5' air-cushioned stand with sandbag. Shoot through the Impact 45" Umbrella at 45° off-axis to the subject's face at eye level. Set Kelvin to 5600K daylight.
2. **Negative Fill:** Position a 30x40" black foam board 0.75m away on the opposite side to swallow stray room reflections.
3. **Exposure Calibration:** Expose key side skin tones to Zone VI.
4. **Measurement:** Verify shadow falloff creates a true 4:1 (2-stop) or 8:1 (3-stop) contrast ratio with crisp facial bone definition.`,
    prerequisites: ["photo-u1-leaf-shutter-sync"],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "photo-u2-nisi-mist-halation",
    medium: "photography",
    unitNumber: 2,
    difficultyTier: 2,
    title: "NiSi Swift Black Mist Highlight Halation & Contrast Roll-Off",
    domain: "Optical Filtration",
    scale: "micro",
    environment: "road",
    requiredGear: [
      "Fujifilm X100VI or Canon EOS R5 Mark II",
      "NiSi 82mm Swift VND Mist Kit 1-9 Stops",
      "Dell XPS 16 OLED Laptop",
    ],
    promptMarkdown: `### Field Optics Exercise: Atmospheric Halation & Organic Roll-Off

Modern ultra-sharp digital sensors can render specular highlights too harshly. Black mist filtration blooms direct light sources while preserving deep shadow blacks.

1. **Staging:** Locate a point light source (street lamp, direct window beam, or neon signage) in your environment.
2. **Comparison Capture:**
   - **Capture 1:** Clean optical shot without diffusion.
   - **Capture 2:** Attach the NiSi Swift Black Mist filter.
3. **Analysis on Dell XPS 16 OLED:**
   - Observe how specular highlight clipping is feathered into an organic atmospheric glow.
   - Confirm that shadow density and micro-contrast remain punchy without milky fogging.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "photo-u2-milestone-editorial-portrait",
    medium: "photography",
    unitNumber: 2,
    difficultyTier: 3,
    title: "Milestone: Fine Art Chiaroscuro Studio Portrait",
    domain: "Studio Portraiture",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Hasselblad X2D 100C + XCD 90mm f/2.5 V",
      "NANLITE FS-300B + Impact 45\" Umbrella",
      "Solid Black Foam-Core Flags",
      "Mac Studio M4 Max + ASUS ProArt PA32DC OLED",
    ],
    promptMarkdown: `### Milestone Project: Hasselblad 16-Bit Medium Format Fine Art Portrait

Execute a complete studio editorial portrait showcasing rich tonal gradation:
1. **Lighting Execution:** Employ the Nanlite FS-300B with the Impact 45" Umbrella as a soft directional key light. Use solid black flags for aggressive negative fill.
2. **16-Bit Capture:** Expose with the Hasselblad X2D 100C and XCD 90mm f/2.5 V at base ISO 64, f/4.
3. **Hasselblad Natural Colour Solution (HNCS):** Review RAW 3FR files in Phocus / Lightroom on the ASUS ProArt 4K OLED. Ensure skin tones transition smoothly from illuminated cheekbones into deep, noise-free shadow gradation.`,
    prerequisites: ["photo-u2-nanlite-directional"],
    status: "available",
    estimatedMinutes: 100,
  },

  // =========================================================================
  // UNIT 2: COLOR & LIGHT (VIDEOGRAPHY TRACK)
  // =========================================================================
  {
    id: "video-u2-clog2-dynamic-range",
    medium: "videography",
    unitNumber: 2,
    difficultyTier: 2,
    title: "Canon R5 Mark II C-Log2 Exposure Mapping & Waveform Discipline",
    domain: "Exposure Science",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Canon EOS R5 MARK II",
      "Canon RF 24-70mm f/2.8L IS USM",
      "NiSi 82mm Swift VND Mist Kit",
      "NANLITE FS-300B Spot Light",
    ],
    promptMarkdown: `### Laboratory: Exposing C-Log2 for Maximum Dynamic Range

Canon's C-Log2 gamma retains over 15 stops of dynamic range by packing more shadow information into the lower IRE values, requiring strict middle-gray placement.

1. **Camera Setup:** Set Canon R5 Mark II to C-Log2 / Cinema Gamut, 10-bit 4:2:2.
2. **False Color & Waveform:** Enable the camera's internal waveform monitor.
3. **18% Gray Placement:** Position an 18% gray reference card or subject's skin under the Nanlite FS-300B. Expose middle gray at exactly 32-35% IRE (C-Log2 target) and caucasian skin highlights at 50-55% IRE.
4. **Verification:** Inspect the waveform to guarantee highlights do not clip above 90% IRE.`,
    prerequisites: ["video-u1-r5m2-shutter-cadence"],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "video-u2-bicolor-practical-harmony",
    medium: "videography",
    unitNumber: 2,
    difficultyTier: 2,
    title: "Nanlite FS-300B Bi-Color Dialing: Warm Key vs Cool Ambient Spill",
    domain: "Cinematic Lighting",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "NANLITE FS-300B LED Bi-Color Spot Light",
      "Canon EOS R5 MARK II",
      "Impact 45\" Umbrella with Stand & Sandbag",
    ],
    promptMarkdown: `### Exercise: Chromatic Separation Through Kelvin Contrasts

1. **Ambient Cool Fill:** Allow late afternoon daylight (~5600K-6000K) to wash through a window as a cool ambient backlight.
2. **Warm Motivated Key:** Dial the Nanlite FS-300B to 3200K tungsten through the Impact umbrella to mimic warm interior practical light.
3. **Camera White Balance:** Set manual white balance on the Canon R5 Mark II to 4300K (the chromatic midpoint).
4. **Capture:** Record a 10-second slow push-in shot, observing the natural chromatic depth between golden skin tones and cool cyan rim light.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "video-u2-milestone-cinematic-look",
    medium: "videography",
    unitNumber: 2,
    difficultyTier: 3,
    title: "Milestone: Dramatic C-Log2 Cinema Scene with NiSi Mist & FS-300B",
    domain: "Cinematography & Color",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Canon EOS R5 MARK II",
      "Canon RF 24-70mm f/2.8L IS USM",
      "NANLITE FS-300B Bi-Color Spot Light",
      "NiSi 82mm Swift VND Mist Kit",
      "Solid Black Foam-Core Flags",
      "Mac Studio M4 Max + ASUS ProArt PA32DC OLED",
    ],
    promptMarkdown: `### Milestone Project: High-Dynamic-Range Cinematic Scene

Produce a 20-second cinematic film vignette with professional lighting and exposure:
1. **Lighting Rig:** Deploy the Nanlite FS-300B dialed to 4500K with the Impact 45" Umbrella and black negative fill flags for high contrast.
2. **Camera Ingestion:** Capture in 4K DCI Fine 23.98p C-Log2 on the Canon R5 Mark II using the NiSi Swift VND + Mist filter.
3. **Master Pipeline:** Ingest into Premiere Pro on the Mac Studio M4 Max. Apply a clean technical transform to Rec.709 on the ASUS ProArt 4K OLED monitor, showing seamless highlight roll-off and noise-free shadow density.`,
    prerequisites: ["video-u2-clog2-dynamic-range", "video-u2-bicolor-practical-harmony"],
    status: "available",
    estimatedMinutes: 110,
  },

  // =========================================================================
  // UNIT 3: POST-PRODUCTION & COLOR (PHOTOGRAPHY TRACK)
  // =========================================================================
  {
    id: "photo-u3-oled-calibration",
    medium: "photography",
    unitNumber: 3,
    difficultyTier: 3,
    title: "ASUS ProArt PA32DC OLED Reference Calibration & Color Management",
    domain: "Display Science",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Mac Studio M4 Max",
      "ASUS ProArt PA32DC 32” 4K OLED HDR Monitor",
      "Adobe Lightroom Classic",
    ],
    promptMarkdown: `### Calibration Protocol: Establishing an Absolute Master Reference

Accurate color grading requires guaranteed display delta-E accuracy without consumer TV color shifts.

1. **Hardware Sensor Routine:** Trigger the built-in motorized colorimeter on the ASUS ProArt PA32DC. Calibrate to standard target: D65 white point, Gamma 2.2, 120 cd/m² luminance for standard print mastering.
2. **Lightroom Color Space Setup:** Verify Lightroom Classic's internal Melissa RGB (ProPhoto RGB with sRGB gamma) pipeline.
3. **ICC Profile Verification:** Check macOS ColorSync display profile to ensure zero double-profiling or clipping between the Mac Studio M4 Max 32-core GPU and the 10-bit OLED panel.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "photo-u3-lab-skin-toning",
    medium: "photography",
    unitNumber: 3,
    difficultyTier: 2,
    title: "Parametric Tone Curve & Color Calibration Panel Sculpting",
    domain: "RAW Processing",
    scale: "micro",
    environment: "road",
    requiredGear: [
      "Dell XPS 16 DA16260 OLED Laptop",
      "4TB Portable SSD (USB-C)",
      "Adobe Lightroom Classic",
    ],
    promptMarkdown: `### Advanced Mobile RAW Lab: Color Calibration Panel Chemistry

1. **Catalog Setup:** Open a high-contrast RAW travel portrait on your Dell XPS 16 OLED.
2. **Calibration Sliders (Under-the-Hood Tuning):**
   - Push Red Primary Hue slightly clockwise (+5 to +10) and boost saturation to warm golden undertones.
   - Shift Blue Primary Hue counter-clockwise (-5) to deepen sky blues into rich cyan-slate.
3. **Parametric Curve:** Build a gentle matte tone curve lifting the black point to 5% while pinning midtones.
4. **Inspect on 4K OLED:** Verify skin highlights remain pristine without unnatural orange masking.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "photo-u3-milestone-print-master",
    medium: "photography",
    unitNumber: 3,
    difficultyTier: 3,
    title: "Milestone: 100MP Fine Art Gallery Master & Soft-Proofing",
    domain: "Print Mastering",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Mac Studio M4 Max",
      "ASUS ProArt PA32DC 32” 4K OLED Monitor",
      "Hasselblad X2D 100C RAW 3FR files",
      "Adobe Lightroom Classic & Photoshop",
    ],
    promptMarkdown: `### Milestone Project: Fine Art Exhibition Master & Soft-Proof Pipeline

Prepare a 100-megapixel medium-format capture for large-format exhibition printing:
1. **RAW Processing:** Develop a Hasselblad 3FR capture in Lightroom Classic with custom lens correction, zero chromatic aberration, and tailored tonal gradation.
2. **Soft-Proofing Simulation:** Enable Soft Proofing in Lightroom for Hahnemühle Photo Rag 308gsm paper profile on the ASUS ProArt PA32DC OLED.
3. **Gamut Warning Audit:** Identify out-of-gamut saturated tones and bring them into printable CMYK/RGB gamut using targeted HSL Luminance adjustments.
4. **Export Master:** Render a full-resolution 16-bit uncompressed TIFF (approx. 600MB) with embedded Adobe RGB (1998) color profile.`,
    prerequisites: ["photo-u3-oled-calibration"],
    status: "available",
    estimatedMinutes: 90,
  },

  // =========================================================================
  // UNIT 3: POST-PRODUCTION & COLOR (VIDEOGRAPHY TRACK)
  // =========================================================================
  {
    id: "video-u3-premiere-cst-grading",
    medium: "videography",
    unitNumber: 3,
    difficultyTier: 2,
    title: "Premiere Pro Lumetri C-Log2 to Rec.709 Color Management",
    domain: "Color Science",
    scale: "micro",
    environment: "road",
    requiredGear: [
      "Dell XPS 16 DA16260 OLED Laptop",
      "Adobe Premiere Pro",
      "Sample 10-bit C-Log2 Footage",
    ],
    promptMarkdown: `### Technical Video Grading: Accurate C-Log2 Normalization

1. **Premiere Color Settings:** In Premiere Pro on your Dell XPS 16 OLED, set Sequence Working Color Space to Rec.709.
2. **Lumetri Color Pipeline:**
   - **Basic Correction:** Apply official Canon C-Log2 / Cinema Gamut to Rec.709 3D LUT or configure manual curve transform.
   - **Exposure Normalization:** Balance exposure offset and white balance before LUT transform.
3. **Waveform & Vectorscope Verification:** Check that highlights roll off smoothly beneath 100 IRE and skin tones track accurately on the 10:30 vectorscope line.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "video-u3-skin-tone-isolation",
    medium: "videography",
    unitNumber: 3,
    difficultyTier: 3,
    title: "Secondary HSL Qualifier & Skin Tone Protection on OLED",
    domain: "Color Grading",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Mac Studio M4 Max",
      "ASUS ProArt PA32DC 32” 4K OLED Monitor",
      "Adobe Premiere Pro",
    ],
    promptMarkdown: `### Advanced Grading Exercise: Secondary Qualifier Separation

1. **Secondary HSL Mask:** In Premiere Pro Lumetri, select the subject's face using the eyedropper in HSL Secondary. Clean up the matte with blur and denoising.
2. **Skin Color Correction:** Correct tint and saturation exclusively within the skin mask.
3. **Cool Background Split:** Outside the mask, push midtones and shadows toward cool teal/slate without contaminating facial warmth.
4. **OLED Scrutiny:** Inspect on the ASUS ProArt PA32DC for color banding, edge halos, or noise artifacts in dark gradient zones.`,
    prerequisites: ["video-u3-premiere-cst-grading"],
    status: "available",
    estimatedMinutes: 40,
  },
  {
    id: "video-u3-milestone-master-grade",
    medium: "videography",
    unitNumber: 3,
    difficultyTier: 3,
    title: "Milestone: Commercial Film Grade & ProRes Master Delivery",
    domain: "Mastering & Finishing",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Mac Studio M4 Max",
      "ASUS ProArt PA32DC 32” 4K OLED Monitor",
      "Canon R5 Mark II 10-bit C-Log2 footage",
      "Adobe Premiere Pro",
    ],
    promptMarkdown: `### Milestone Project: Broadcast-Ready Cinema Commercial Master

Take an edited 30-second multi-shot sequence from raw C-Log2 to final broadcast master:
1. **Shot Matching:** Balance exposures, color temperatures, and contrast ratios across 4 different camera angles.
2. **Master Look Curve:** Build a filmic tone curve with gentle highlight roll-off and rich shadow density.
3. **Export Master:** Render a ProRes 422 HQ 4K DCI master with Rec.709 tag.
4. **Deliverable:** Generate a 10-second side-by-side wipe comparison showcasing the raw logarithmic sensor capture alongside the finished graded frame.`,
    prerequisites: ["video-u3-premiere-cst-grading", "video-u3-skin-tone-isolation"],
    status: "available",
    estimatedMinutes: 110,
  },

  // =========================================================================
  // UNIT 4: AUDIO ENGINEERING (PHOTOGRAPHY TRACK)
  // =========================================================================
  {
    id: "photo-u4-client-field-audio",
    medium: "photography",
    unitNumber: 4,
    difficultyTier: 2,
    title: "Field Client Interview & Behind-the-Scenes Audio Capture",
    domain: "Audio Journalism",
    scale: "micro",
    environment: "road",
    requiredGear: [
      "DJI Mic 3 2-Person Wireless Microphone System",
      "iPhone 17 Pro Max or Fujifilm X100VI",
      "Dell XPS 16 OLED Laptop",
      "AirPods (5th Gen)",
    ],
    promptMarkdown: `### Field Audio: Capturing High-Fidelity Artist Notes on the Move

A great photo essay is elevated when paired with crystal-clear recorded voice notes and ambient interviews.

1. **Transmitter Placement:** Clip the DJI Mic 3 transmitter onto the subject's collar, inverted to conceal the logo. Attach the windscreen.
2. **Receiver Ingestion:** Connect the DJI Mic 3 receiver to the iPhone 17 Pro Max (USB-C) or Fujifilm X100VI mic input.
3. **Gain Staging:** Set input gain so conversational speech peaks between -18dB and -12dB.
4. **Recording:** Capture a 2-minute spontaneous artist statement while shooting in the field.
5. **Review:** Inspect signal-to-noise ratio and vocal intimacy using AirPods on your Dell XPS 16.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "photo-u4-studio-voiceover",
    medium: "photography",
    unitNumber: 4,
    difficultyTier: 2,
    title: "Studio Voiceover & Artist Statement Acoustic Isolation",
    domain: "Studio Audio",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Audio-Technica AT2020USB-X Pro Cardioid Microphone",
      "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
      "Mac Studio M4 Max",
      "Adobe Premiere Pro",
    ],
    promptMarkdown: `### Studio Recording: Professional Cardioid Voiceover for Photo Slideshows

1. **Acoustic Staging:** Position the Audio-Technica AT2020USB-X on your desk, angled 45° toward your mouth at a distance of 15cm (6 inches) to utilize the cardioid proximity effect.
2. **Direct Monitoring:** Connect Sony WH-1000XM4 headphones via 3.5mm directly to the AT2020USB-X headphone jack for zero-latency hardware monitoring.
3. **Voiceover Ingestion:** In Premiere Pro, record a 60-second spoken commentary breaking down the visual concept of your recent Hasselblad fine art stills.
4. **Parametric Cleanup:** Apply a 80Hz high-pass filter to eliminate desk rumble and a subtle de-esser on sibilance (6-8 kHz).`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "photo-u4-milestone-multimedia-essay",
    medium: "photography",
    unitNumber: 4,
    difficultyTier: 2,
    title: "Milestone: Multimedia Photo Essay with Mastered Voiceover",
    domain: "Multimedia Storytelling",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Hasselblad X2D 100C or Canon EOS R5 Mark II Stills",
      "Audio-Technica AT2020USB-X Microphone",
      "Sony WH-1000XM4 Headphones",
      "Mac Studio M4 Max + Adobe Premiere Pro",
    ],
    promptMarkdown: `### Milestone Project: 60-Second Audio-Visual Exhibition Presentation

Combine still images with studio-quality audio:
1. **Still Selection:** Curate 8-10 high-resolution still photographs from your portfolio.
2. **Audio Track:** Record an insightful narrative voiceover using the Audio-Technica AT2020USB-X.
3. **Sound Bed Mixing:** Layer subtle room tone and an instrumental ambient soundtrack under the voiceover. Duck background music by -18dB whenever speech is active.
4. **Mastering:** Export an MP4 video presentation normalized to -14 LUFS integrated loudness with zero peak clipping.`,
    prerequisites: ["photo-u4-studio-voiceover"],
    status: "available",
    estimatedMinutes: 90,
  },

  // =========================================================================
  // UNIT 4: AUDIO ENGINEERING (VIDEOGRAPHY TRACK)
  // =========================================================================
  {
    id: "video-u4-dji-mic3-gain-staging",
    medium: "videography",
    unitNumber: 4,
    difficultyTier: 2,
    title: "DJI Mic 3 Dual-Transmitter Field Wireless & 32-Bit Float Safety",
    domain: "Production Sound",
    scale: "micro",
    environment: "road",
    requiredGear: [
      "DJI Mic 3 2-Person Wireless Microphone System",
      "Canon EOS R5 MARK II",
      "AirPods (5th Gen) or Sony WH-1000XM4",
      "Dell XPS 16 OLED Laptop",
    ],
    promptMarkdown: `### Field Audio Masterclass: Dual-Transmitter Gain Architecture

1. **Dual Lavalier Rigging:** Equip two subjects with DJI Mic 3 transmitters. Use magnetic clips or hidden collar placement.
2. **Internal Safety Recording:** Enable on-board 32-bit float backup recording inside the DJI Mic 3 transmitters.
3. **Camera Gain Alignment:** Set the Canon EOS R5 Mark II manual mic gain to low (step 4-6) to allow the clean DJI preamp to carry the load and avoid camera hiss.
4. **Audio Stress Test:** Have a subject speak in a whisper, followed by an abrupt loud laugh. Verify the on-board 32-bit float backup avoids digital clipping.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "video-u4-rodemicro-directional",
    medium: "videography",
    unitNumber: 4,
    difficultyTier: 2,
    title: "Rode VideoMic-R On-Camera Shock Mounting & Ambient Foley Sync",
    domain: "Camera Audio & Foley",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Canon EOS R5 MARK II",
      "Rode VideoMic-R Directional Microphone",
      "Manfrotto 290 Tripod or Handheld Rig",
    ],
    promptMarkdown: `### Audio Exercise: Directional Shotgun vs Handling Noise

1. **Rycote Shock Mount Inspection:** Mount the Rode VideoMic-R on the Canon R5 Mark II cold shoe. Ensure the suspension bands isolate hand movement and lens motor noise.
2. **Directional Pickup Pattern:** Record a walking subject at 1 meter, 2 meters, and 4 meters in an echoic room.
3. **A/B Sound Test:** Compare the directional clarity of the Rode VideoMic-R against internal camera microphones.
4. **Foley Capture:** Record 30 seconds of tactile Foley sounds (turning camera dials, closing a hard case, footsteps on hardwood).`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "video-u4-milestone-multichannel-mix",
    medium: "videography",
    unitNumber: 4,
    difficultyTier: 3,
    title: "Milestone: 3-Track Documentary Mix & EBU R128 (-14 LUFS) Mastering",
    domain: "Audio Post-Production",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Mac Studio M4 Max",
      "Audio-Technica AT2020USB-X Microphone",
      "DJI Mic 3 Wireless Recordings",
      "Sony WH-1000XM4 Studio Headphones",
      "Adobe Premiere Pro",
    ],
    promptMarkdown: `### Milestone Project: Full Commercial Soundscape Post-Production

Build an immersive audio mix for a 45-second commercial vignette:
1. **Dialogue Track:** Balance and EQ primary lavalier speech from the DJI Mic 3. Apply subtle compression (2:1 ratio) and gentle de-reverb.
2. **Voiceover Track:** Record an authoritative voiceover using the Audio-Technica AT2020USB-X.
3. **Ambient & Foley Bed:** Layer room tone, natural environmental Foley recorded with the Rode VideoMic-R, and stereo musical score.
4. **Mastering & Loudness Metering:** In Premiere Pro's Loudness Radar, master the final mix to exactly -14 LUFS integrated (YouTube/web standard) or -24 LUFS (broadcast), with True Peak ceiling at -1.0 dBTP.`,
    prerequisites: ["video-u4-dji-mic3-gain-staging", "video-u4-rodemicro-directional"],
    status: "available",
    estimatedMinutes: 100,
  },

  // =========================================================================
  // UNIT 5: STORYTELLING & MOTION (PHOTOGRAPHY TRACK)
  // =========================================================================
  {
    id: "photo-u5-sequential-timing",
    medium: "photography",
    unitNumber: 5,
    difficultyTier: 2,
    title: "The Decisive Slice: Micro-Timing & Sequential Narrative Cadence",
    domain: "Visual Narrative",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "Canon EOS R5 MARK II or Fujifilm X100VI",
      "Canon RF 24-70mm f/2.8L IS USM",
      "Leofoto MT-03 Spider Tabletop Tripod",
    ],
    promptMarkdown: `### Narrative Study: The Decisive Micro-Second

Still photography captures a solitary slice of time that implies both the preceding action and the subsequent consequence.

1. **Anticipation Setup:** Frame a dynamic action (liquid pouring into glass, hand picking up an artisan tool, or paper folding).
2. **Single-Frame Precision:** Rather than spraying burst frames, train your hand-eye coordination to anticipate the exact peak kinetic tension.
3. **Capture:** Capture 3 distinct moments:
   - *Moment A (Tension):* The millisecond right before contact.
   - *Moment B (Apex):* The absolute instant of impact/contact.
   - *Moment C (Resolution):* The physical aftermath.
4. **Analysis:** Review the 3 images and select the single frame that carries the most narrative weight.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "photo-u5-editorial-story-arc",
    medium: "photography",
    unitNumber: 5,
    difficultyTier: 2,
    title: "5-Frame Editorial Contact Sheet Narrative Arc",
    domain: "Photojournalism",
    scale: "micro",
    environment: "road",
    requiredGear: [
      "Dell XPS 16 DA16260 OLED Laptop",
      "Adobe Lightroom Classic",
      "Travel Photo Catalog",
    ],
    promptMarkdown: `### Editorial Exercise: Constructing a Narrative Arc with Stills

1. **Curate 5 Frames:** In Lightroom Classic on your Dell XPS 16 OLED, assemble a 5-image sequence depicting a real travel journey or creative endeavor:
   - **Frame 1 (Opening / Establishing):** Wide atmospheric environment setting tone and place.
   - **Frame 2 (Character / Relationship):** Subject interacting with their craft or companion.
   - **Frame 3 (Detail / Micro):** Extreme close-up of a key object or tactile gesture.
   - **Frame 4 (Conflict / Climax):** The moment of maximum visual tension or effort.
   - **Frame 5 (Resolution / Aftermath):** A quiet closing frame that lingers in the viewer's memory.
2. **Contact Sheet Export:** Generate a single PDF or JPEG contact sheet demonstrating harmonic color balance across all 5 frames.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 35,
  },
  {
    id: "photo-u5-milestone-photojournalism",
    medium: "photography",
    unitNumber: 5,
    difficultyTier: 3,
    title: "Milestone: Complete 5-Frame Fine Art Photojournalism Story",
    domain: "Documentary Photography",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Hasselblad X2D 100C + XCD 90mm & 28mm",
      "Canon EOS R5 MARK II + RF 24-70mm f/2.8L",
      "Mac Studio M4 Max + ASUS ProArt PA32DC OLED",
    ],
    promptMarkdown: `### Milestone Project: Cohesive Editorial Photo Story

Produce an editorial photo essay capturing an artisan craft, culinary preparation, or intimate studio process:
1. **Shooting Discipline:** Capture the 5 classic photojournalistic story pillars (Establishing, Portrait, Process, Detail, Closer).
2. **Lens Mastery:** Intentionally transition between the Hasselblad XCD 28mm for environmental dignity and XCD 90mm for intimate portrait isolation.
3. **Master Presentation:** Grade all 5 frames to a shared chromatic standard in Lightroom Classic on the ASUS ProArt 4K OLED. Export a portfolio-ready digital spreads presentation.`,
    prerequisites: ["photo-u5-sequential-timing", "photo-u5-editorial-story-arc"],
    status: "available",
    estimatedMinutes: 120,
  },

  // =========================================================================
  // UNIT 5: STORYTELLING & MOTION (VIDEOGRAPHY TRACK)
  // =========================================================================
  {
    id: "video-u5-rs5-gimbal-balance",
    medium: "videography",
    unitNumber: 5,
    difficultyTier: 2,
    title: "DJI RS 5 Gimbal 3-Axis Balance Calibration & Motor Tuning",
    domain: "Camera Movement",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "DJI RS 5 Gimbal Combo Kit with Briefcase Handle",
      "Canon EOS R5 MARK II",
      "Canon RF 24-70mm f/2.8L IS USM (or RF 15-35mm)",
    ],
    promptMarkdown: `### Hardware Workshop: Perfect Gimbal Neutral Balance & Motor Auto-Tune

An improperly balanced gimbal causes micro-jitter, motor strain, and ruined long-take shots.

1. **Mechanical Balance Sequence:**
   - **Tilt Vertical:** Point lens to the ceiling; adjust vertical arm until camera remains motionless.
   - **Tilt Horizontal:** Level camera horizontally; slide plate until lens stays level at any tilt angle.
   - **Roll Axis:** Adjust roll arm until camera does not tilt left or right.
   - **Pan Axis:** Tilt gimbal 45° forward; adjust pan arm until camera does not swing.
2. **Auto-Tune Calibration:** Power on the DJI RS 5. Run Motor Auto-Tune on the touchscreen to calibrate PID motor stiffness for the Canon R5 Mark II + RF 24-70mm payload.
3. **Stability Test:** Perform slow lateral walking steps in Ninja Walk posture; inspect for zero motor oscillations.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "video-u5-briefcase-ai-tracking",
    medium: "videography",
    unitNumber: 5,
    difficultyTier: 3,
    title: "DJI RS 5 AI Tracking Module & Low-Angle Briefcase Movement",
    domain: "Kinetic Cinematography",
    scale: "micro",
    environment: "home",
    requiredGear: [
      "DJI RS 5 Gimbal Combo Kit with AI Tracking Module & Briefcase Handle",
      "Canon EOS R5 MARK II",
      "Canon RF 15-35mm f/2.8L IS USM Lens",
    ],
    promptMarkdown: `### Kinetic Cinematography: Dynamic Tracking & Low-to-High Pedestal Movement

1. **Briefcase Configuration:** Attach the DJI RS 5 Briefcase Handle for ergonomic two-handed low-angle carriage.
2. **AI Tracking Module Engagement:** Activate the AI tracking module. Frame your subject and trigger active subject lock.
3. **The Reveal Move:** Begin walking low to the ground behind an obstacle (desk or doorway) at ankle height, smoothly rising up into a sweeping eye-level push-in while the AI module maintains seamless center-mass subject tracking.
4. **Scrutiny:** Verify there is no horizon tilt drift during the transition from low-mode to eye-level.`,
    prerequisites: ["video-u5-rs5-gimbal-balance"],
    status: "available",
    estimatedMinutes: 40,
  },
  {
    id: "video-u5-match-cut-action",
    medium: "videography",
    unitNumber: 5,
    difficultyTier: 2,
    title: "Kinetic Match-Cutting on Action & Spatial Continuity",
    domain: "Editorial Rhythm",
    scale: "micro",
    environment: "road",
    requiredGear: [
      "Dell XPS 16 DA16260 OLED Laptop",
      "Adobe Premiere Pro",
      "4TB Portable SSD",
    ],
    promptMarkdown: `### Editorial Exercise: Invisible Cuts on High-Speed Movement

1. **Timeline Setup:** In Premiere Pro on your Dell XPS 16 OLED, open two clips of the same physical action shot from two angles (e.g., wide shot opening door vs tight interior close-up).
2. **Match Point Alignment:** Identify the exact frame of maximum kinetic momentum (the door handle turning and latch clicking).
3. **Trim & Overlap:** Cut on the action vector so the viewer's eye follows the directional energy across the cut point without perceiving the edit seam.
4. **Playback Scrutiny:** Play back at full speed; verify that momentum is conserved across the spatial jump.`,
    prerequisites: [],
    status: "available",
    estimatedMinutes: 30,
  },
  {
    id: "video-u5-milestone-short-film",
    medium: "videography",
    unitNumber: 5,
    difficultyTier: 3,
    title: "Milestone: 60-Second Short Cinematic Vignette with Motorized Motion",
    domain: "Cinematic Directing & Post",
    scale: "milestone",
    environment: "home",
    requiredGear: [
      "Canon EOS R5 MARK II + RF 15-35mm & RF 24-70mm",
      "DJI RS 5 Gimbal with AI Tracking Module",
      "NANLITE FS-300B Spot Light",
      "DJI Mic 3 Wireless System",
      "Mac Studio M4 Max + ASUS ProArt PA32DC OLED",
    ],
    promptMarkdown: `### Capstone Milestone Project: 60-Second High-Production Narrative Short

Direct, shoot, edit, and master a comprehensive 60-second narrative short film utilizing your full studio ecosystem:
1. **Pre-Production:** Storyboard a 6-scene visual arc featuring motivated character action and high emotional resonance.
2. **Production:**
   - Employ the DJI RS 5 for dynamic tracking shots and low-angle briefcase reveals.
   - Light with the Nanlite FS-300B with directional chiaroscuro and negative fill.
   - Record dual-channel dialogue with the DJI Mic 3 wireless transmitters.
3. **Post-Production:**
   - Ingest 10-bit C-Log2 media onto the Mac Studio M4 Max.
   - Perform precision pacing and match-cuts on action in Premiere Pro.
   - Master sound to -14 LUFS with dialogue clarity, Foley, and soundtrack ducking.
   - Grade to Rec.709 reference on the ASUS ProArt PA32DC 4K OLED monitor.
4. **Master Export:** Render a 4K ProRes 422 HQ master file.`,
    prerequisites: [
      "video-u5-rs5-gimbal-balance",
      "video-u5-briefcase-ai-tracking",
      "video-u5-match-cut-action",
    ],
    status: "available",
    estimatedMinutes: 150,
  },
];

export const DEFAULT_GEAR_PROFILE: GearProfile = {
  name: "Strags Studio & Travel Gear Setup",
  cameras: [
    "Hasselblad X2D 100C (100MP Medium Format)",
    "Canon EOS R5 MARK II (Full-Frame Hybrid)",
    "Fujifilm X100VI (Fixed 23mm f/2 Leaf Shutter)",
    "Canon AE-1 Program 35mm Film Camera",
    "iPhone 17 Pro Max",
    "Insta360 Ace Pro 2 Action Camera",
  ],
  lenses: [
    "Hasselblad XCD 90mm f/2.5 V Lens",
    "Hasselblad XCD 28mm f/4 P Lens",
    "Canon RF 24-70mm f/2.8L IS USM Lens",
    "Canon RF 15-35mm f/2.8L IS USM Lens",
    "Canon FD 50mm f/1.8 (AE-1 Program)",
  ],
  lighting: [
    "NANLITE FS-300B LED Bi-Color Spot Light (300W)",
    "Impact 45\" Umbrella Black/White with Removable Cover",
    "Impact 9.5' Heavy-Duty Air-Cushioned Light Stand",
    "Solid Black Foam-Core Flags (Negative Fill)",
    "Impact 15lb Cordura Saddle Sandbag",
  ],
  audio: [
    "Audio-Technica AT2020USB-X Pro Cardioid USB Microphone",
    "DJI Mic 3 2-Person Compact Wireless Microphone System (2x TX, 1x RX)",
    "Rode VideoMic-R Directional On-Camera Microphone",
    "Sony WH-1000XM4 Wireless Noise-Canceling Studio Headphones",
    "Apple AirPods (5th Gen)",
  ],
  supportAndMotion: [
    "DJI RS 5 Gimbal Combo Kit with AI Tracking Module & Briefcase Handle",
    "Manfrotto 290 Tripod with Quick Release Ball Head",
    "Leofoto MT-03 Spider Tabletop Tripod & LH-25 Mini Ball Head",
  ],
  accessories: [
    "NiSi 82mm Swift VND Mist Kit (1-9 Stops Variable ND + Black Mist)",
    "4TB Portable Rugged NVMe SSD (USB-C)",
  ],
  editingSetup: {
    hardware:
      "Mac Studio M4 Max (32-Core GPU, 64GB Unified Memory) & Dell XPS 16 DA16260 OLED Laptop (Graphite)",
    monitors: "ASUS ProArt PA32DC 32” 4K OLED HDR Reference Monitor (Self-Calibrating)",
    software: ["Adobe Lightroom Classic", "Adobe Premiere Pro", "Adobe Photoshop"],
  },
  portableKit: [
    "Dell XPS 16 DA16260 OLED Laptop Computer",
    "Fujifilm X100VI with Built-in 4-Stop ND",
    "Canon AE-1 Program 35mm Film Camera",
    "DJI Mic 3 2-Person Wireless Mic System",
    "iPhone 17 Pro Max",
    "Insta360 Ace Pro 2 Action Cam",
    "Leofoto MT-03 Spider Tabletop Tripod",
    "4TB Portable USB-C SSD",
    "Apple AirPods (5th Gen)",
  ],
  studioKit: [
    "Mac Studio M4 Max (32-Core GPU, 64GB RAM)",
    "ASUS ProArt PA32DC 32\" 4K OLED HDR Reference Monitor",
    "Hasselblad X2D 100C + XCD 90mm f/2.5 V & 28mm f/4 P",
    "Canon EOS R5 MARK II + RF 24-70mm f/2.8L & RF 15-35mm f/2.8L",
    "NANLITE FS-300B Bi-Color Spot Light + Impact 45\" Umbrella & Stand",
    "DJI RS 5 Gimbal with AI Tracking Module & Briefcase Handle",
    "Audio-Technica AT2020USB-X Cardioid Microphone",
    "Sony WH-1000XM4 Studio Headphones",
    "Manfrotto 290 Tripod with Ball Head",
    "NiSi 82mm Swift VND Mist Kit",
  ],
};
