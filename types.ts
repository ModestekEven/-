
export interface Achievement {
  title: string;
  category: 'AI' | 'Entrepreneurship' | 'Honors' | 'Education';
  description?: string;
}

export interface ParticleProps {
  color?: string;
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}
