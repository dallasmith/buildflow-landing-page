'use client';

import { useEffect, useState, useRef } from 'react';

interface StickyCTAProps {
  label: string;
  href: string;
}

export default function StickyCTA({ label, href }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMainCTAVisible, setIsMainCTAVisible] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Intersection Observer for scroll-based visibility
    const scrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-200px 0px 0px 0px'
      }
    );

    // Intersection Observer for main CTA section visibility
    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        setIsMainCTAVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe scroll position
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Observe main CTA section
    if (ctaSectionRef.current) {
      ctaObserver.observe(ctaSectionRef.current);
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      scrollObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  // Don't render if main CTA is visible or component should be hidden
  if (isMainCTAVisible || !isVisible) {
    return null;
  }

  return (
    <div 
      ref={stickyRef}
      className="sticky-cta"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e5e5',
        padding: '16px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(0)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <a
          href={href}
          className="sticky-cta-button"
          style={{
            display: 'block',
            width: '100%',
            backgroundColor: '#015ef4',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '16px 24px',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'background-color 0.2s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #015ef4';
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0051d1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#015ef4';
          }}
        >
          {label}
        </a>
      </div>
      
      {/* Hidden reference to main CTA section for intersection observer */}
      <div 
        ref={ctaSectionRef}
        style={{ position: 'absolute', top: '-100vh', pointerEvents: 'none' }}
        aria-hidden="true"
      />
    </div>
  );
}
