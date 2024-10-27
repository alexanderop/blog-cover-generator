'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface OpenAIIntegrationProps {
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
  onGenerateImage: (prompt: string) => Promise<void>;
}

export function OpenAIIntegration({ apiKey, onApiKeyChange, onGenerateImage }: OpenAIIntegrationProps) {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="openai-api-key">OpenAI API Key</Label>
        <Input
          id="openai-api-key"
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="Enter your OpenAI API key"
        />
      </div>
      <div>
        <Label htmlFor="image-prompt">Image Prompt</Label>
        <Input
          id="image-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate"
        />
      </div>
      <Button onClick={() => onGenerateImage(prompt)} disabled={!apiKey || !prompt}>
        Generate Image
      </Button>
    </div>
  );
}
