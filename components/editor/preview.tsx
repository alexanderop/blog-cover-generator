'use client';

import { CoverConfig } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FaVuejs, FaReact, FaAngular, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiAstro, SiNextdotjs, SiSvelte } from 'react-icons/si';
import React, { useEffect, useRef, useState } from 'react';

const defaultColors = {
  background: 'rgb(33, 39, 55)',
  text: 'rgb(234, 237, 243)',
  accent: 'rgb(255, 107, 237)',
  card: 'rgb(52, 63, 96)',
  cardMuted: 'rgb(138, 51, 123)',
  border: 'rgb(171, 75, 153)',
};

interface PreviewProps {
  config: CoverConfig;
  onConfigChange: (newConfig: Partial<CoverConfig>) => void;
}

const titleSizes = {
  small: 'text-3xl',
  medium: 'text-4xl',
  large: 'text-5xl',
};

const overlayStyles = {
  none: '',
  light: 'bg-white/30',
  dark: 'bg-black/40',
  gradient: 'bg-gradient-to-t from-black/60 to-black/20',
};

const logoComponents: { [key: string]: React.ComponentType } = {
  Vue: FaVuejs,
  React: FaReact,
  Angular: FaAngular,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'Node.js': FaNodeJs,
  Python: FaPython,
  Astro: SiAstro,
  'Next.js': SiNextdotjs,
  Svelte: SiSvelte,
};

export function Preview({ config, onConfigChange }: PreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const authorRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const [titleFontSize, setTitleFontSize] = useState(32);
  const [authorFontSize, setAuthorFontSize] = useState(16);
  const [tagsFontSize, setTagsFontSize] = useState(12);

  useEffect(() => {
    const resizeText = () => {
      if (containerRef.current && titleRef.current && authorRef.current && tagsRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        // Adjust title font size
        let newTitleFontSize = titleFontSize;
        while (
          (titleRef.current.scrollWidth > containerWidth * 0.9 || titleRef.current.scrollHeight > containerHeight * 0.5) &&
          newTitleFontSize > 16
        ) {
          newTitleFontSize--;
          titleRef.current.style.fontSize = `${newTitleFontSize}px`;
        }
        setTitleFontSize(newTitleFontSize);

        // Adjust author font size
        let newAuthorFontSize = authorFontSize;
        while (
          (authorRef.current.scrollWidth > containerWidth * 0.9 || authorRef.current.scrollHeight > containerHeight * 0.2) &&
          newAuthorFontSize > 12
        ) {
          newAuthorFontSize--;
          authorRef.current.style.fontSize = `${newAuthorFontSize}px`;
        }
        setAuthorFontSize(newAuthorFontSize);

        // Adjust tags font size
        let newTagsFontSize = tagsFontSize;
        while (
          (tagsRef.current.scrollWidth > containerWidth * 0.9 || tagsRef.current.scrollHeight > containerHeight * 0.2) &&
          newTagsFontSize > 8
        ) {
          newTagsFontSize--;
          tagsRef.current.style.fontSize = `${newTagsFontSize}px`;
        }
        setTagsFontSize(newTagsFontSize);
      }
    };

    resizeText();
    window.addEventListener('resize', resizeText);
    return () => window.removeEventListener('resize', resizeText);
  }, [config, titleFontSize, authorFontSize, tagsFontSize]);

  const getLayoutClasses = () => {
    const baseClasses = 'flex flex-col text-white';
    
    switch (config.layout) {
      case 'left':
        return `${baseClasses} items-start justify-${config.contentAlignment} w-1/2`;
      case 'right':
        return `${baseClasses} items-end justify-${config.contentAlignment} w-1/2 ml-auto`;
      case 'top':
        return `${baseClasses} items-${config.contentAlignment} justify-start h-1/2`;
      case 'bottom':
        return `${baseClasses} items-${config.contentAlignment} justify-end h-1/2 mt-auto`;
      case 'diagonal':
        return `${baseClasses} items-start justify-start`;
      case 'asymmetric':
        return `${baseClasses} items-center justify-${config.contentAlignment}`;
      default:
        return `${baseClasses} items-center justify-${config.contentAlignment}`;
    }
  };

  const LogoComponent = config.logo ? logoComponents[config.logo] : null;

  const getFilterStyle = () => {
    let filterString = `brightness(${config.brightness}%)`;
    if (config.blur) filterString += ` blur(${config.blur}px)`;
    if (config.contrast) filterString += ` contrast(${config.contrast}%)`;
    if (config.saturation) filterString += ` saturate(${config.saturation}%)`;
    return filterString;
  };

  const getBackgroundStyle = () => {
    const baseStyle = {
      backgroundColor: config.backgroundColor || defaultColors.background,
      backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: getFilterStyle(),
    };

    switch (config.backgroundPosition) {
      case 'right':
        return { ...baseStyle, backgroundPosition: 'right', width: '50%', right: 0 };
      case 'left':
        return { ...baseStyle, backgroundPosition: 'left', width: '50%', left: 0 };
      case 'top':
        return { ...baseStyle, backgroundPosition: 'top', height: '50%', top: 0 };
      case 'bottom':
        return { ...baseStyle, backgroundPosition: 'bottom', height: '50%', bottom: 0 };
      default:
        return baseStyle;
    }
  };

  const getContentStyle = () => {
    const baseStyle = {
      position: 'absolute' as const,
      padding: `${config.padding}px`,
    };

    switch (config.backgroundPosition) {
      case 'right':
        return { ...baseStyle, width: '50%', left: 0, top: 0, bottom: 0 };
      case 'left':
        return { ...baseStyle, width: '50%', right: 0, top: 0, bottom: 0 };
      case 'top':
        return { ...baseStyle, height: '50%', bottom: 0, left: 0, right: 0 };
      case 'bottom':
        return { ...baseStyle, height: '50%', top: 0, left: 0, right: 0 };
      default:
        return { ...baseStyle, inset: 0 };
    }
  };

  const getThemeStyles = () => {
    const baseContentStyle = {
      position: 'absolute' as const,
      padding: `${config.padding}px`,
      inset: 0,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'flex-start',
      overflow: 'hidden', // Changed from 'auto' to 'hidden'
    };

    switch (config.theme) {
      case 'default':
        return {
          backgroundStyle: {},
          contentStyle: {
            ...baseContentStyle,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
          },
        };
      case 'split':
        return {
          backgroundStyle: { width: '40%', left: 0 }, // Reduced width to 40%
          contentStyle: {
            ...baseContentStyle,
            width: '60%', // Increased width to 60%
            right: 0,
            left: 'auto',
            padding: `${config.padding * 1.5}px`, // Increased padding
          },
        };
      case 'minimal':
        return {
          backgroundStyle: { opacity: 0.1 },
          contentStyle: baseContentStyle,
        };
      case 'bold':
        return {
          backgroundStyle: { filter: 'brightness(50%)' },
          contentStyle: baseContentStyle,
        };
      case 'gradient':
        return {
          backgroundStyle: { backgroundImage: `linear-gradient(45deg, ${config.backgroundColor}, ${config.accentColor})` },
          contentStyle: baseContentStyle,
        };
      case 'text-only':
        return {
          backgroundStyle: { display: 'none' },
          contentStyle: { ...baseContentStyle, backgroundColor: config.backgroundColor },
        };
      case 'abstract':
        return {
          backgroundStyle: { 
            backgroundImage: `linear-gradient(45deg, ${config.backgroundColor}, ${config.accentColor}, ${config.textColor})`,
            filter: 'blur(20px)',
          },
          contentStyle: { ...baseContentStyle, zIndex: 10 },
        };
      case 'pattern':
        return {
          backgroundStyle: { 
            backgroundColor: config.backgroundColor,
            backgroundImage: `radial-gradient(circle at 20px 20px, ${config.accentColor} 2px, transparent 0)`,
            backgroundSize: '40px 40px',
          },
          contentStyle: baseContentStyle,
        };
      case 'neon':
        return {
          backgroundStyle: { backgroundColor: 'black' },
          contentStyle: {
            ...baseContentStyle,
            textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de',
          },
        };
      case 'retro':
        return {
          backgroundStyle: { 
            backgroundColor: '#f4c430', // Mustard yellow
            backgroundImage: 'linear-gradient(45deg, #f4c430 25%, #ff6b6b 25%, #ff6b6b 50%, #f4c430 50%, #f4c430 75%, #ff6b6b 75%, #ff6b6b 100%)',
            backgroundSize: '40px 40px',
          },
          contentStyle: {
            ...baseContentStyle,
            color: '#1a1a1a', // Dark gray
            textShadow: '2px 2px 0 #fff',
            fontFamily: '"Press Start 2P", cursive',
            border: '4px solid #1a1a1a',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          },
        };
      case 'glassmorphism':
        return {
          backgroundStyle: {
            backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          },
          contentStyle: {
            ...baseContentStyle,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
          },
        };
      case 'duotone':
        return {
          backgroundStyle: {
            backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(1) brightness(90%)',
            mixBlendMode: 'color',
          },
          contentStyle: {
            ...baseContentStyle,
            backgroundColor: config.accentColor,
            mixBlendMode: 'screen',
          },
        };
      default:
        return {
          backgroundStyle: {},
          contentStyle: getContentStyle(),
        };
    }
  };

  const { backgroundStyle, contentStyle } = getThemeStyles();

  return (
    <div className="sticky top-4">
      <Card className={cn("overflow-hidden cover-preview", { "border-4": config.border })} style={{ borderColor: config.borderColor || defaultColors.border }}>
        <div ref={containerRef} className="aspect-video relative">
          <div
            className="absolute inset-0"
            style={{
              ...getBackgroundStyle(),
              ...backgroundStyle,
            }}
          />
          {config.theme !== 'text-only' && (
            <>
              <div className={cn('absolute inset-0', overlayStyles[config.overlay])} />
              {config.grainEffect && (
                <div className="absolute inset-0 opacity-40" style={{
                  backgroundImage: 'url("data:image/png;base64,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")',
                }} />
              )}
            </>
          )}
          <div 
            className={cn(getLayoutClasses(), 'absolute')} 
            style={{
              ...contentStyle,
              padding: config.theme === 'split' ? `${config.padding * 1.5}px` : `${config.padding}px`,
              fontFamily: `'${config.font}', sans-serif`,
            }}
          >
            <div className={cn('w-full h-full flex flex-col justify-center', { 'bg-black bg-opacity-50 rounded-lg p-6': config.theme !== 'text-only' && config.theme !== 'split' })}>
              <h2
                ref={titleRef}
                className={cn(
                  'font-bold leading-tight break-words',
                  {
                    'text-left': config.textAlign === 'left',
                    'text-center': config.textAlign === 'center',
                    'text-right': config.textAlign === 'right',
                    'mb-2': config.theme !== 'split',
                    'mb-4': config.theme === 'split',
                  }
                )}
                style={{ 
                  fontFamily: config.font,
                  color: config.textColor || defaultColors.text,
                  textShadow: config.textShadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
                  fontSize: `${titleFontSize}px`,
                  lineHeight: '1.2',
                }}
              >
                {config.title}
              </h2>
              <p 
                ref={authorRef}
                className={cn('opacity-90', {
                  'text-left': config.textAlign === 'left',
                  'text-center': config.textAlign === 'center',
                  'text-right': config.textAlign === 'right',
                  'mb-2': config.theme !== 'split',
                  'mb-4': config.theme === 'split',
                })}
                style={{ 
                  color: config.textColor || defaultColors.text,
                  textShadow: config.textShadow ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none',
                  fontSize: `${authorFontSize}px`,
                }}
              >
                {config.author}
              </p>
              {config.tags && (
                <div 
                  ref={tagsRef}
                  className={cn("flex flex-wrap gap-2", { "mt-2": config.theme !== 'split', "mt-4": config.theme === 'split' })}
                >
                  {config.tags.split(',').map((tag) => (
                    <span 
                      key={tag.trim()} 
                      className="px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: config.accentColor || defaultColors.accent,
                        color: config.backgroundColor || defaultColors.background,
                        fontSize: `${tagsFontSize}px`,
                      }}
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {LogoComponent && config.theme !== 'text-only' && (
            <div className="absolute bottom-4 right-4">
              {React.createElement(LogoComponent, {
                className: "w-10 h-10",
                style: { color: config.accentColor || defaultColors.accent }
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
