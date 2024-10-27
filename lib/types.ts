export interface CoverConfig {
  title: string;
  author: string;
  tags: string;
  font: string;
  backgroundImage: string | null;
  logo: string | null;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  theme: 'default' | 'split' | 'minimal' | 'bold' | 'gradient' | 'text-only' | 'abstract' | 'pattern' | 'neon' | 'retro' | 'glassmorphism' | 'duotone';
  openAIApiKey?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding: number;
  textShadow?: boolean;
}
