import React, { ReactNode, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
}) => {
  // The ref is now on the root element to provide a stable base for offset calculations
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const cards = Array.from(container.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    const lastTransforms = new Map<number, any>();

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });
    
    const parsePercentage = (value: string | number, height: number) => {
        return typeof value === 'string' && value.includes('%') ? (parseFloat(value) / 100) * height : parseFloat(value as string);
    };

    const updateCardTransforms = (scrollTop: number) => {
      if (!cards.length) return;

      const containerHeight = window.innerHeight;
      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
      const endElement = container.querySelector('.scroll-stack-end') as HTMLElement;
      // Correctly calculate absolute position of the end marker
      const endElementTop = endElement ? container.offsetTop + endElement.offsetTop : document.body.scrollHeight;

      cards.forEach((card, i) => {
        // --- BUG FIX ---
        // Correctly calculate the absolute top position of each card relative to the document
        const cardTop = container.offsetTop + card.offsetTop;
        const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
        const pinEnd = endElementTop - containerHeight;

        const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
        const hasPassed = scrollTop > pinEnd;

        let translateY = 0;
        let scale = 1;

        if (isPinned) {
          translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
          const progressStart = cardTop - stackPositionPx;
          const progressEnd = pinEnd;
          const progress = Math.max(0, Math.min(1, (scrollTop - progressStart) / (progressEnd - progressStart)));
          scale = 1 - progress * (1 - (baseScale + i * itemScale));

        } else if (hasPassed) {
          translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
          scale = baseScale + i * itemScale;
        }
        
        const rotation = isPinned || hasPassed ? rotationAmount * i * (1-scale) / (1-(baseScale + i * itemScale)) : 0;

        const newTransform = { translateY, scale, rotation };
        const lastTransform = lastTransforms.get(i);

        // Update style only if values have changed to improve performance
        if (!lastTransform || Math.abs(lastTransform.translateY - newTransform.translateY) > 0.01 || Math.abs(lastTransform.scale - newTransform.scale) > 0.001) {
            card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
            lastTransforms.set(i, newTransform);
        }
      });
    };

    const lenis = new Lenis({ lerp: 0.1 });
    
    const onScroll = (e: Lenis) => updateCardTransforms(e.scroll);
    lenis.on('scroll', onScroll);
    
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    // Initial update on load
    updateCardTransforms(window.scrollY);

    return () => {
      lenis.destroy();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // Dependencies that should trigger a re-setup of the animation
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount]);

  return (
    // The ref is now on the root element, which has `position: relative`
    <div className={`relative w-full ${className}`.trim()} ref={containerRef}>
      <div className="scroll-stack-inner px-4 sm:px-8 md:px-20 min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;