'use client';

import { useState, useRef, useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const questionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const toggleItem = (index: number) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(index)) {
      newExpandedItems.delete(index);
    } else {
      newExpandedItems.add(index);
    }
    setExpandedItems(newExpandedItems);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        toggleItem(index);
        break;
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (index + 1) % items.length;
        questionRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = index === 0 ? items.length - 1 : index - 1;
        questionRefs.current[prevIndex]?.focus();
        break;
    }
  };

  // Focus management for keyboard navigation
  useEffect(() => {
    questionRefs.current = questionRefs.current.slice(0, items.length);
  }, [items.length]);

  return (
    <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, index) => {
        const isExpanded = expandedItems.has(index);
        const questionId = `faq-q-${index}`;
        const answerId = `faq-a-${index}`;

        return (
          <div key={index} className="faq-accordion-item">
            <button
              ref={(el) => (questionRefs.current[index] = el)}
              id={questionId}
              className="faq-question"
              aria-expanded={isExpanded}
              aria-controls={answerId}
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                padding: '20px',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1a1a1a',
                borderBottom: '1px solid #e5e5e5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                outline: 'none',
                transition: 'background-color 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.outline = '2px solid #015ef4';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>{item.question}</span>
              <span
                className="faq-chevron"
                style={{
                  fontSize: '20px',
                  color: '#015ef4',
                  transition: prefersReducedMotion ? 'none' : 'transform 0.3s ease',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  lineHeight: '1'
                }}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              hidden={!isExpanded}
              className="faq-answer"
              style={{
                padding: '0 20px 20px',
                color: '#666',
                lineHeight: '1.6',
                fontSize: '16px',
                backgroundColor: '#f9fafb',
                borderBottom: isExpanded ? '1px solid #e5e5e5' : 'none',
                overflow: 'hidden',
                transition: prefersReducedMotion ? 'none' : 'all 0.3s ease-in-out',
                maxHeight: isExpanded ? '500px' : '0',
                opacity: isExpanded ? 1 : 0
              }}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
