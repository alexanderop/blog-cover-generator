'use client';

import { useState } from 'react';
import { ControlPanel } from './control-panel';
import { Preview } from './preview';
import { CoverConfig } from '@/lib/types';

const defaultConfig: CoverConfig = {
  title: 'My Awesome Tech Blog Post',
  author: 'John Doe',
  tags: 'javascript, react, webdev',
  font: 'fira-code',
  color: '#3b82f6',
  backgroundImage: null,
  layout: 'centered',
  textAlign: 'center',
  overlay: 'dark',
  titleSize: 'medium',
  brightness: 100,
  logo: null,
  backgroundColor: 'rgb(33, 39, 55)',
  textColor: 'rgb(234, 237, 243)',
  accentColor: 'rgb(255, 107, 237)',
};

export function CoverEditor() {
  const [config, setConfig] = useState<CoverConfig>(defaultConfig);

  const handleConfigChange = (newConfig: Partial<CoverConfig>) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
    if (newConfig.generateNew) {
      // TODO: Implement AI-based cover generation logic here
      console.log('Generating new cover...');
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2 h-screen p-6">
      <ControlPanel config={config} onConfigChange={handleConfigChange} />
      <Preview config={config} />
    </div>
  );
}
