export interface CoverConfig {
  title: string;
  author: string;
  platform: string;
  font: string;
  color: string;
  backgroundImage: string | null;
  layout: 'centered' | 'left' | 'right';
  textAlign: 'left' | 'center' | 'right';
  overlay: 'none' | 'light' | 'dark' | 'gradient';
  titleSize: 'small' | 'medium' | 'large';
}