export type AssignmentScale = 'micro' | 'milestone';

export type Environment = 'road' | 'home';

export type MediumTrack = 'photography' | 'videography';

export type AssignmentStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export type DifficultyTier = 1 | 2 | 3 | 'beginner' | 'intermediate' | 'advanced';

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
}

export interface GearProfile {
  id?: string;
  name: string;
  cameras: string[];
  lenses: string[];
  lighting: string[];
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
