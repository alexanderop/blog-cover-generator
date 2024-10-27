'use client';

import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ImagePickerProps {
  selectedImage: string | null;
  onImageSelect: (url: string) => void;
}

export function ImagePicker({ selectedImage, onImageSelect }: ImagePickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onImageSelect(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="background-image">Background Image</Label>
        <Input
          id="background-image"
          value={selectedImage || ''}
          onChange={(e) => onImageSelect(e.target.value)}
          placeholder="Enter image URL"
        />
      </div>
      <div>
        <Button onClick={handleButtonClick}>Upload Image</Button>
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {selectedImage && (
        <div className="mt-4">
          <img src={selectedImage} alt="Selected background" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
}
