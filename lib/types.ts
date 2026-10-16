export type AssignmentScale = 'micro' | 'milestone';

export type Environment = 'road' | 'home';

export type MediumTrack = 'photography' | 'videography';

export type AssignmentStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export type DifficultyTier = 1 | 2 | 3 | 'beginner' | 'intermediate' | 'advanced';

export interface InspirationAsset {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  notes?: string;
}

export type GearCompatibilityStatus = 'compatible' | 'missing-gear' | 'adapted';

export interface GearCompatibilityReport {
  status: GearCompatibilityStatus;
  notes: string;
  flaggedItems: string[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface AssignmentPlanningData {
  inspirationAssets: InspirationAsset[];
  freeFormNotes: string;
  gearCompatibility: GearCompatibilityReport;
  checklist: ChecklistItem[];
}

export interface AssignmentReflectionData {
  whatWorkedWell: string;
  technicalAdjustments: string;
  submissionUrl: string;
  completedAt?: string;
}

export interface AssignmentSubmission {
  assignmentId: string;
  status: AssignmentStatus;
  planning: AssignmentPlanningData;
  reflection: AssignmentReflectionData;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  medium: MediumTrack;
  unitNumber: number;
  difficultyTier: DifficultyTier;
  title: string;
  domain: string;
  scale: AssignmentScale;
  environment: Environment;
  requiredGear: string[];
  promptMarkdown: string;
  prerequisites: string[];
  status: AssignmentStatus;
  estimatedMinutes?: number;
  planning?: AssignmentPlanningData;
  reflection?: AssignmentReflectionData;
}

export interface GearProfile {
  id?: string;
  name: string;
  cameras: string[];
  lenses: string[];
  lighting: string[];
  audio?: string[];
  supportAndMotion?: string[];
  accessories?: string[];
  editingSetup: {
    hardware: string;
    monitors?: string;
    software: string[];
  };
  portableKit: string[];
  studioKit: string[];
}

export interface UnitInfo {
  unitNumber: number;
  title: string;
  tagline: string;
  description: string;
  topics: string[];
  accentColor?: string;
}
