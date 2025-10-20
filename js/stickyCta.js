/**
 * StickyCTA Module - Mobile-only sticky call-to-action
 * Appears after scrolling ~700px and hides when main CTA section is visible
 */

export function initStickyCta({ label, href, targetId }) {
  // Check if we're on desktop (hide on >=1024px)
  if (window.innerWidth >= 1024) {
    return;
  }

  // Create sticky CTA container
  const stickyCta = document.createElement('div');
  stickyCta.id = 'sticky-cta';
  stickyCta.className = 'sticky-cta';
  stickyCta.style.cssText = `
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
    padding: 16px;
    padding-bottom: max(12px, env(safe-area-inset-bottom));
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
  `;

  // Create inner container
  const inner = document.createElement('div');
  inner.className = 'sticky-cta__inner';
  inner.style.cssText = `
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  `;

  // Create button
  const button = document.createElement('button');
  button.className = 'sticky-cta__button';
  button.textContent = label || '🔒 Reserve Your Spot — $10';
  button.style.cssText = `
    display: block;
    width: 100%;
    background: #015ef4;
    color: #ffffff;
    border: none;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    outline: none;
    min-height: 44px;
  `;

  // Button hover and focus styles
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = '#0051d1';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = '#015ef4';
  });

  button.addEventListener('focus', () => {
    button.style.outline = '2px solid #015ef4';
    button.style.outlineOffset = '2px';
  });

  button.addEventListener('blur', () => {
    button.style.outline = 'none';
  });

  // Button click handler
  button.addEventListener('click', () => {
    if (href && href.startsWith('#')) {
      // Smooth scroll to target if it's an anchor
      const target = document.querySelector(href);
      if (target) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          target.scrollIntoView();
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (href) {
      // Navigate to href if it's a URL
      window.location.href = href;
    }
  });

  // Assemble the sticky CTA
  inner.appendChild(button);
  stickyCta.appendChild(inner);
  document.body.appendChild(stickyCta);

  // Intersection Observer for main CTA section
  const ctaSection = document.getElementById(targetId);
  if (!ctaSection) {
    console.warn(`StickyCTA: Target section #${targetId} not found`);
    return;
  }

  const ctaObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Hide sticky CTA when main CTA is visible
        stickyCta.style.transform = 'translateY(100%)';
      }
    },
    {
      threshold: 0.8,
      rootMargin: '0px 0px -100px 0px'
    }
  );

  ctaObserver.observe(ctaSection);

  // Scroll handler for showing sticky CTA
  let isVisible = false;
  const handleScroll = () => {
    const shouldShow = window.scrollY > 700 && !ctaSection.matches(':in-viewport');
    
    if (shouldShow && !isVisible) {
      stickyCta.style.transform = 'translateY(0)';
      isVisible = true;
    } else if (!shouldShow && isVisible) {
      stickyCta.style.transform = 'translateY(100%)';
      isVisible = false;
    }
  };

  // Throttled scroll handler
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll);
  
  // Initial check
  handleScroll();

  // Cleanup function
  const cleanup = () => {
    window.removeEventListener('scroll', throttledScroll);
    ctaObserver.disconnect();
    if (stickyCta.parentNode) {
      stickyCta.parentNode.removeChild(stickyCta);
    }
  };

  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);

  console.log('StickyCTA initialized:', { label, href, targetId, observerActive: true });
  
  return cleanup;
}


