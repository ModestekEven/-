
export interface Achievement {
  title: string;
  category: 'AI' | 'Entrepreneurship' | 'Honors' | 'Education';
  description?: string;
}

export interface ParticleProps {
  color?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
