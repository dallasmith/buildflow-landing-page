/**
 * FAQ Accordion Module - Accessible, keyboard-friendly accordion
 * Supports Enter/Space to toggle, Arrow keys for navigation
 */

export function initFaqAccordion(containerSelector = '#faq') {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn(`FAQAccordion: Container ${containerSelector} not found`);
    return;
  }

  // Find all FAQ items
  const faqItems = container.querySelectorAll('.faq-item');
  if (faqItems.length === 0) {
    console.warn('FAQAccordion: No FAQ items found');
    return;
  }

  console.log(`FAQAccordion: Found ${faqItems.length} items, initializing...`);

  // Transform each FAQ item to accordion structure
  faqItems.forEach((item, index) => {
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');
    
    if (!question || !answer) {
      console.warn(`FAQAccordion: Invalid structure for item ${index}`);
      return;
    }

    // Get the text content
    const questionText = question.textContent;
    const answerText = answer.textContent;

    // Create new accordion structure
    const toggleButton = document.createElement('button');
    toggleButton.className = 'faq-toggle';
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-controls', `faq-a-${index}`);
    toggleButton.id = `faq-q-${index}`;
    toggleButton.textContent = questionText;

    const panel = document.createElement('div');
    panel.className = 'faq-panel';
    panel.id = `faq-a-${index}`;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', `faq-q-${index}`);
    panel.setAttribute('hidden', '');
    panel.textContent = answerText;

    // Clear the original content and add new structure
    item.innerHTML = '';
    item.appendChild(toggleButton);
    item.appendChild(panel);

    // Add click handler
    toggleButton.addEventListener('click', () => togglePanel(toggleButton, panel));

    // Add keyboard handlers
    toggleButton.addEventListener('keydown', (e) => handleKeydown(e, index, faqItems.length));
  });

  // Function to toggle panel
  function togglePanel(button, panel) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isExpanded) {
      button.setAttribute('aria-expanded', 'false');
      panel.setAttribute('hidden', '');
    } else {
      button.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');
    }

    // Add visual feedback
    if (!prefersReducedMotion) {
      panel.style.transition = 'all 0.3s ease-in-out';
    }
  }

  // Function to handle keyboard navigation
  function handleKeydown(event, currentIndex, totalItems) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        const currentButton = event.target;
        const currentPanel = document.getElementById(currentButton.getAttribute('aria-controls'));
        togglePanel(currentButton, currentPanel);
        break;

      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % totalItems;
        const nextButton = document.getElementById(`faq-q-${nextIndex}`);
        if (nextButton) {
          nextButton.focus();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
        const prevButton = document.getElementById(`faq-q-${prevIndex}`);
        if (prevButton) {
          prevButton.focus();
        }
        break;
    }
  }

  // Add CSS for focus-visible (if not already present)
  if (!document.querySelector('#faq-accordion-styles')) {
    const style = document.createElement('style');
    style.id = 'faq-accordion-styles';
    style.textContent = `
      .faq-toggle:focus-visible {
        outline: 2px solid #015ef4;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }

  console.log(`FAQAccordion: Initialized with ${faqItems.length} items`);
}


