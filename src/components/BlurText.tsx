'use client'

import { motion, type Transition, type Easing } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

/**
 * iOS Safari renders `filter: blur()` as permanently invisible on elements
 * with `-webkit-text-fill-color: transparent` (gradient text).
 */
function isIOSSafari(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document);
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  // On iOS Safari, skip blur filter because it breaks gradient text rendering
  const [skipBlur, setSkipBlur] = useState(false);

  useEffect(() => {
    setSkipBlur(isIOSSafari());
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    // Double-defer: setTimeout + rAF ensures iOS Safari has completed layout
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        if (el) observer.observe(el);
      });
    }, 50);

    // Fallback: if observer hasn't fired after 1.5s, force show
    const fallback = setTimeout(() => {
      setInView(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const defaultFrom: Record<string, string | number> = useMemo(
    () => {
      const base: Record<string, string | number> = skipBlur
        ? { opacity: 0, y: direction === 'top' ? -30 : 30 }
        : { filter: 'blur(10px)', opacity: 0, y: direction === 'top' ? -50 : 50 };
      return base;
    },
    [direction, skipBlur]
  );

  const defaultTo: Array<Record<string, string | number>> = useMemo(
    () => {
      if (skipBlur) {
        return [
          { opacity: 0.5, y: direction === 'top' ? 3 : -3 } as Record<string, string | number>,
          { opacity: 1, y: 0 } as Record<string, string | number>,
        ];
      }
      return [
        { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 } as Record<string, string | number>,
        { filter: 'blur(0px)', opacity: 1, y: 0 } as Record<string, string | number>,
      ];
    },
    [direction, skipBlur]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity'
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
