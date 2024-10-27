'use client';

import { CoverConfig } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PreviewProps {
  config: CoverConfig;
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

export function Preview({ config }: PreviewProps) {
  const getLayoutClasses = () => {
    const baseClasses = 'relative z-10 flex flex-col text-white p-8';
    
    switch (config.layout) {
      case 'left':
        return `${baseClasses} items-start justify-center w-1/2`;
      case 'right':
        return `${baseClasses} items-end justify-center w-1/2 ml-auto`;
      default:
        return `${baseClasses} items-center justify-center`;
    }
  };

  return (
    <div className="sticky top-4">
      <Card className="overflow-hidden">
        <div
          className="aspect-video relative"
          style={{
            backgroundColor: config.color,
            backgroundImage: config.backgroundImage
              ? `url(${config.backgroundImage})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={cn('absolute inset-0', overlayStyles[config.overlay])} />
          <div className={getLayoutClasses()}>
            <h2
              className={cn(
                'mb-4 font-bold leading-tight',
                titleSizes[config.titleSize],
                {
                  'text-left': config.textAlign === 'left',
                  'text-center': config.textAlign === 'center',
                  'text-right': config.textAlign === 'right',
                }
              )}
              style={{ fontFamily: config.font }}
            >
              {config.title}
            </h2>
            <p className={cn('text-xl opacity-90', {
              'text-left': config.textAlign === 'left',
              'text-center': config.textAlign === 'center',
              'text-right': config.textAlign === 'right',
            })}>
              {config.author}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}