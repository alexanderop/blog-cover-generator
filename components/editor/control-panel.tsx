'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CoverConfig } from '@/lib/types';
import { ImagePicker } from './image-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { LogoPicker } from './logo-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ColorPicker } from './color-picker';
import { toPng } from 'html-to-image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { OpenAIIntegration } from './openai-integration';
import { ThemeSelector } from './theme-selector';

const defaultColors = {
  background: 'rgb(33, 39, 55)',
  text: 'rgb(234, 237, 243)',
  accent: 'rgb(255, 107, 237)',
  card: 'rgb(52, 63, 96)',
  cardMuted: 'rgb(138, 51, 123)',
  border: 'rgb(171, 75, 153)',
};

const fonts = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'playfair-display', label: 'Playfair Display' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'open-sans', label: 'Open Sans' },
  { value: 'lato', label: 'Lato' },
  { value: 'fira-code', label: 'Fira Code' },
];

interface ControlPanelProps {
  config: CoverConfig;
  onConfigChange: (config: CoverConfig) => void;
}

export function ControlPanel({ config, onConfigChange }: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState('themes');

  const handleChange = (key: keyof CoverConfig, value: any) => {
    onConfigChange({ ...config, [key]: value });
  };

  const handleGenerateNewCover = async () => {
    const previewElement = document.querySelector('.cover-preview');
    if (previewElement) {
      try {
        const dataUrl = await toPng(previewElement as HTMLElement);
        const link = document.createElement('a');
        link.download = 'blog-cover.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating cover:', error);
      }
    }
  };

  const handleGenerateImage = async (prompt: string) => {
    if (!config.openAIApiKey) return;

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openAIApiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        }),
      });

      const data = await response.json();
      if (data.data && data.data[0] && data.data[0].url) {
        handleChange('backgroundImage', data.data[0].url);
      } else {
        console.error('Failed to generate image:', data);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <Card className="h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-4">
          {['themes', 'content', 'colors', 'background'].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <CardContent className="flex-grow overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="themes" className="space-y-4 mt-4">
              <ThemeSelector
                selectedTheme={config.theme}
                onThemeSelect={(theme) => handleChange('theme', theme)}
              />
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Post Title</Label>
                <Input
                  id="title"
                  value={config.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter your tech blog post title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={config.author}
                  onChange={(e) => handleChange('author', e.target.value)}
                  placeholder="Enter author name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={config.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  placeholder="javascript, react, webdev"
                />
              </div>
              <div className="space-y-2">
                <Label>Logo</Label>
                <LogoPicker
                  selectedLogo={config.logo}
                  onLogoSelect={(logo) => handleChange('logo', logo)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="font">Font</Label>
                <Select
                  value={config.font}
                  onValueChange={(value) => handleChange('font', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[220px] justify-start text-left font-normal"
                      style={{ backgroundColor: config.backgroundColor || defaultColors.background }}
                    >
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: config.backgroundColor || defaultColors.background }}
                      />
                      {config.backgroundColor || defaultColors.background}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <ColorPicker
                      color={config.backgroundColor || defaultColors.background}
                      onChange={(color) => handleChange('backgroundColor', color)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[220px] justify-start text-left font-normal"
                      style={{ backgroundColor: config.textColor || defaultColors.text }}
                    >
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: config.textColor || defaultColors.text }}
                      />
                      {config.textColor || defaultColors.text}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <ColorPicker
                      color={config.textColor || defaultColors.text}
                      onChange={(color) => handleChange('textColor', color)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[220px] justify-start text-left font-normal"
                      style={{ backgroundColor: config.accentColor || defaultColors.accent }}
                    >
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: config.accentColor || defaultColors.accent }}
                      />
                      {config.accentColor || defaultColors.accent}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <ColorPicker
                      color={config.accentColor || defaultColors.accent}
                      onChange={(color) => handleChange('accentColor', color)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </TabsContent>

            <TabsContent value="background" className="space-y-4 mt-4">
              <OpenAIIntegration
                apiKey={config.openAIApiKey || ''}
                onApiKeyChange={(key) => handleChange('openAIApiKey', key)}
                onGenerateImage={handleGenerateImage}
              />
              <ImagePicker
                selectedImage={config.backgroundImage}
                onImageSelect={(url) => handleChange('backgroundImage', url)}
              />
            </TabsContent>
          </motion.div>
        </CardContent>
        <div className="p-6">
          <Button className="w-full" onClick={handleGenerateNewCover}>
            Generate New Cover
          </Button>
        </div>
      </Tabs>
    </Card>
  );
}
