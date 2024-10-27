import React from 'react';
import { Button } from '@/components/ui/button';
import { FaVuejs, FaReact, FaAngular, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiAstro, SiNextdotjs, SiSvelte } from 'react-icons/si';

const logos = [
  { name: 'Vue', icon: FaVuejs },
  { name: 'React', icon: FaReact },
  { name: 'Angular', icon: FaAngular },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Python', icon: FaPython },
  { name: 'Astro', icon: SiAstro },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Svelte', icon: SiSvelte },
];

interface LogoPickerProps {
  selectedLogo: string | null;
  onLogoSelect: (logo: string) => void;
}

export function LogoPicker({ selectedLogo, onLogoSelect }: LogoPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {logos.map((logo) => (
        <Button
          key={logo.name}
          variant={selectedLogo === logo.name ? 'default' : 'outline'}
          size="icon"
          onClick={() => onLogoSelect(logo.name)}
        >
          <logo.icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}
