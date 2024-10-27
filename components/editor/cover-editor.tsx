'use client';

import { useState } from 'react';
import { ControlPanel } from './control-panel';
import { Preview } from './preview';
import { CoverConfig } from '@/lib/types';

const defaultConfig: CoverConfig = {
  title: 'My Awesome Blog Post',
  author: 'John Doe',
  platform: 'hashnode',
  font: 'inter',
  color: '#3b82f6',
  backgroundImage: null,
  layout: 'centered',
  textAlign: 'center',
  overlay: 'dark',
  titleSize: 'medium',
};

export function CoverEditor() {
  const [config, setConfig] = useState<CoverConfig>(defaultConfig);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ControlPanel config={config} onConfigChange={setConfig} />
      <Preview config={config} />
    </div>
  );
}