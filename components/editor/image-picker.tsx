'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface ImagePickerProps {
  selectedImage: string | null;
  onImageSelect: (url: string) => void;
}

export function ImagePicker({ selectedImage, onImageSelect }: ImagePickerProps) {
  const [query, setQuery] = useState('');

  // For now, we'll use placeholder images
  const demoImages = [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    'https://images.unsplash.com/photo-1682687220063-4742bd7c7ae3',
    'https://images.unsplash.com/photo-1682687220199-d0124f48f95b',
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images..."
        />
        <Button variant="secondary" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {demoImages.map((url) => (
          <button
            key={url}
            onClick={() => onImageSelect(url)}
            className={`aspect-video overflow-hidden rounded-md ${
              selectedImage === url ? 'ring-2 ring-primary' : ''
            }`}
          >
            <img
              src={url}
              alt="Background option"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}