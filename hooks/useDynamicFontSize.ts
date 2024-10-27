import { useState, useEffect, useRef } from 'react';

export function useDynamicFontSize(content: string, maxWidth: number, maxHeight: number) {
  const [fontSize, setFontSize] = useState(32); // Start with a large font size
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeText = () => {
      if (textRef.current) {
        let currentSize = fontSize;
        while (
          (textRef.current.scrollWidth > maxWidth || textRef.current.scrollHeight > maxHeight) &&
          currentSize > 12 // Minimum font size
        ) {
          currentSize--;
          setFontSize(currentSize);
        }
      }
    };

    resizeText();
  }, [content, maxWidth, maxHeight, fontSize]);

  return { fontSize, textRef };
}
