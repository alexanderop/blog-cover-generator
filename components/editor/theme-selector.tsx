import React from 'react';
import { Button } from '@/components/ui/button';

const themes = [
  { name: 'default', label: 'Default' },
  { name: 'split', label: 'Split' },
  { name: 'minimal', label: 'Minimal' },
  { name: 'bold', label: 'Bold' },
  { name: 'gradient', label: 'Gradient' },
  { name: 'text-only', label: 'Text Only' },
  { name: 'abstract', label: 'Abstract' },
  { name: 'pattern', label: 'Pattern' },
  { name: 'neon', label: 'Neon' },
  { name: 'retro', label: 'Retro' },
  { name: 'glassmorphism', label: 'Glassmorphism' },
  { name: 'duotone', label: 'Duotone' },
];

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}

export function ThemeSelector({ selectedTheme, onThemeSelect }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {themes.map((theme) => (
        <Button
          key={theme.name}
          variant={selectedTheme === theme.name ? 'default' : 'outline'}
          onClick={() => onThemeSelect(theme.name)}
          className="h-24 flex flex-col items-center justify-center"
        >
          <div className={`w-16 h-12 mb-2 rounded flex items-center justify-center text-xs ${getThemePreviewStyle(theme.name)}`}>
            {theme.name}
          </div>
          {theme.label}
        </Button>
      ))}
    </div>
  );
}

function getThemePreviewStyle(themeName: string): string {
  switch (themeName) {
    case 'default':
      return 'bg-gradient-to-r from-blue-500 to-purple-500';
    case 'split':
      return 'bg-gradient-to-r from-gray-200 to-gray-600';
    case 'minimal':
      return 'bg-gray-100 text-gray-800';
    case 'bold':
      return 'bg-black text-white';
    case 'gradient':
      return 'bg-gradient-to-r from-green-400 to-blue-500';
    case 'text-only':
      return 'bg-white text-black border border-gray-300';
    case 'abstract':
      return 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500';
    case 'pattern':
      return 'bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-sm';
    case 'neon':
      return 'bg-black text-green-400 border-2 border-green-400 shadow-[0_0_10px_#4ade80]';
    case 'retro':
      return 'bg-yellow-400 text-gray-900 border-4 border-gray-900 font-bold';
    case 'glassmorphism':
      return 'bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg';
    case 'duotone':
      return 'bg-gradient-to-r from-indigo-500 to-purple-500 mix-blend-color-burn';
    default:
      return 'bg-gray-200';
  }
}
