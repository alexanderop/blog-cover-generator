'use client';

import { ControlPanel } from '@/components/editor/control-panel'
import { Preview } from '@/components/editor/preview'
import { ThemeToggle } from '@/components/theme-toggle'
import { useState } from 'react'
import { CoverConfig } from '@/lib/types'

const defaultConfig: CoverConfig = {
  title: 'My Awesome Tech Blog Post',
  author: 'John Doe',
  tags: 'react,nextjs,typescript',
  layout: 'centered',
  contentAlignment: 'center',
  textAlign: 'center',
  titleSize: 'large',
  font: 'inter',
  backgroundColor: 'rgb(33, 39, 55)',
  textColor: 'rgb(234, 237, 243)',
  accentColor: 'rgb(255, 107, 237)',
  brightness: 100,
  overlay: 'none',
  padding: 40,
  backgroundPosition: 'full',
  theme: 'default',
}

export default function Home() {
  const [config, setConfig] = useState<CoverConfig>(defaultConfig)

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">DevCover</h1>
          <ThemeToggle />
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <ControlPanel config={config} onConfigChange={setConfig} />
          </div>
          <div className="order-1 lg:order-2">
            <Preview config={config} onConfigChange={setConfig} />
          </div>
        </div>
      </div>
    </main>
  )
}
