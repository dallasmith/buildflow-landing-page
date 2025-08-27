import { describe, it, expect } from 'vitest';
import { landingCopy } from '../content/landingCopy.js';

/**
 * SNAPSHOT TEST FOR LANDING PAGE COPY
 * 
 * ⚠️  IMPORTANT: This test prevents accidental copy changes
 * 
 * If you need to update copy:
 * 1. Get explicit approval from business owner
 * 2. Update the content in content/landingCopy.ts
 * 3. Run: npm run test -- --update-snapshots
 * 4. Verify the changes are correct
 * 5. Commit both content changes AND updated snapshot
 * 
 * NEVER update snapshots without business approval!
 */

describe('landingCopy', () => {
  it('should maintain exact copy consistency', () => {
    // This snapshot captures the EXACT current copy
    // Any text changes will cause this test to fail
    expect(landingCopy).toMatchSnapshot();
  });

  it('should have all required sections', () => {
    // Verify structure integrity
    expect(landingCopy).toHaveProperty('hero');
    expect(landingCopy).toHaveProperty('problem');
    expect(landingCopy).toHaveProperty('appScreenshot');
    expect(landingCopy).toHaveProperty('howItWorks');
    expect(landingCopy).toHaveProperty('projectsScreenshot');
    expect(landingCopy).toHaveProperty('textConversations');
    expect(landingCopy).toHaveProperty('features');
    expect(landingCopy).toHaveProperty('beforeAfter');
    expect(landingCopy).toHaveProperty('ctaSection');
    expect(landingCopy).toHaveProperty('faq');
    expect(landingCopy).toHaveProperty('finalCta');
  });

  it('should have non-empty content in all sections', () => {
    // Ensure no empty strings or missing content
    const checkContent = (obj: Record<string, unknown>, path: string = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (typeof value === 'string') {
          expect(value.trim()).not.toBe('', `${currentPath} should not be empty`);
          expect(value.length).toBeGreaterThan(0, `${currentPath} should have content`);
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          checkContent(value, currentPath);
        } else if (Array.isArray(value)) {
          expect(value.length).toBeGreaterThan(0, `${currentPath} should not be empty array`);
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              checkContent(item, `${currentPath}[${index}]`);
            }
          });
        }
      }
    };

    checkContent(landingCopy);
  });

  it('should maintain consistent BuildFlow branding', () => {
    // Ensure BuildFlow is consistently referenced
    const buildFlowReferences = JSON.stringify(landingCopy).match(/BuildFlow/g);
    expect(buildFlowReferences).toBeTruthy();
    expect(buildFlowReferences!.length).toBeGreaterThan(0);
  });

  it('should have FAQ items with both questions and answers', () => {
    // Verify FAQ structure
    expect(landingCopy.faq).toHaveProperty('items');
    expect(landingCopy.faq.items).toBeInstanceOf(Array);
    expect(landingCopy.faq.items.length).toBeGreaterThan(0);
    
    landingCopy.faq.items.forEach((item, index) => {
      expect(item).toHaveProperty('question');
      expect(item).toHaveProperty('answer');
      expect(item.question.trim()).not.toBe('', `FAQ item ${index} question is empty`);
      expect(item.answer.trim()).not.toBe('', `FAQ item ${index} answer is empty`);
    });
  });
});
