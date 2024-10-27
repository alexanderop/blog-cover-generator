'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface ControlPanelProps {
  config: CoverConfig;
  onConfigChange: (config: CoverConfig) => void;
}

export function ControlPanel({ config, onConfigChange }: ControlPanelProps) {
  const handleChange = (key: keyof CoverConfig, value: any) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cover Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={config.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter your blog post title"
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout & Style</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Layout Style</Label>
            <Select
              value={config.layout}
              onValueChange={(value) => handleChange('layout', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="centered">Centered</SelectItem>
                <SelectItem value="left">Left Panel</SelectItem>
                <SelectItem value="right">Right Panel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Text Alignment</Label>
            <Select
              value={config.textAlign}
              onValueChange={(value) => handleChange('textAlign', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select text alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Title Size</Label>
            <Select
              value={config.titleSize}
              onValueChange={(value) => handleChange('titleSize', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select title size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Overlay Style</Label>
            <Select
              value={config.overlay}
              onValueChange={(value) => handleChange('overlay', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select overlay style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="montserrat">Montserrat</SelectItem>
                <SelectItem value="playfair">Playfair Display</SelectItem>
                <SelectItem value="opensans">Open Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Accent Color</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={config.color}
                onChange={(e) => handleChange('color', e.target.value)}
                className="h-10 w-20"
              />
              <Input
                value={config.color}
                onChange={(e) => handleChange('color', e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Background Image</CardTitle>
        </CardHeader>
        <CardContent>
          <ImagePicker
            selectedImage={config.backgroundImage}
            onImageSelect={(url) => handleChange('backgroundImage', url)}
          />
        </CardContent>
      </Card>
    </div>
  );
}