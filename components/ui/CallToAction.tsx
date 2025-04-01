'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CallToActionProps {
  title: string;
  buttonText: string;
  href: string;
  variant?: "primary" | "secondary"; // default: primary
  bg?: string; // default: "bg-muted/10" 
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title,
  buttonText,
  href,
  variant = "primary",
  bg = "bg-muted/10",
}) => {
  return (
    <div className={cn(
      "py-16 md:py-24 px-6 md:px-12 rounded-xl w-full max-w-6xl mx-auto border-t border-muted/20 mt-12",
      bg,
      "dark:bg-gray-800/20"
    )}>
      <div className="flex flex-col items-center">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6 text-foreground">
          {title}
        </h2>
        <Link href={href} passHref>
          <Button 
            variant={variant === "primary" ? "gard-primary" : "gard-secondary"} 
            className="px-6 py-3 text-base rounded-full hover:scale-105 transition-all mx-auto"
            aria-label={buttonText}
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction; 