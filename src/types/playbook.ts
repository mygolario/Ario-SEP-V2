export type PlaybookLevel = 'fast' | 'standard' | 'deep';

export interface PlaybookResource {
  title: string;
  url: string;
  type: 'external' | 'internal' | 'tool';
}

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  isAutomated?: boolean;
}

export interface PlaybookOption {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  recommendation?: 'recommended' | 'neutral' | 'advanced';
}

export interface PlaybookTemplate {
  title: string;
  description?: string;
  content: string; // Markdown or raw text
  language?: string; // e.g., 'text', 'json', 'typescript'
}

export interface PlaybookMistake {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'critical';
}

export interface PlaybookContent {
  level: PlaybookLevel;
  costEstimate: string; // e.g. "500,000 - 1,000,000 Toman"
  timeEstimate: string; // e.g. "2-3 Days"
  steps: PlaybookStep[];
  options?: PlaybookOption[];
  mistakes?: PlaybookMistake[];
  templates?: PlaybookTemplate[];
  definitionOfDone: string[];
}

export interface Playbook {
  id: string;
  relatedBlockId?: string; // Links to a JourneyBlock
  title: string;
  description: string;
  contents: Record<PlaybookLevel, PlaybookContent>;
  resources?: PlaybookResource[];
}
