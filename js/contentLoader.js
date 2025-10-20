// Content loader for BuildFlow landing page
// This script loads content from landingCopy.js and applies it to the HTML

import { landingCopy } from '../content/landingCopy.js';

// Function to safely set text content
function setTextContent(selector, text) {
  const element = document.querySelector(selector);
  if (element && text !== undefined) {
    element.textContent = text;
  }
}

// Function to safely set HTML content
function setHTMLContent(selector, html) {
  const element = document.querySelector(selector);
  if (element && html !== undefined) {
    element.innerHTML = html;
  }
}

// Function to populate header content
function populateHeader() {
  setTextContent('.logo', landingCopy.header.logo);
  setTextContent('nav a[href="#how-it-works"]', landingCopy.header.nav.howItWorks);
  setTextContent('nav a[href="#features"]', landingCopy.header.nav.features);
  setTextContent('nav a[href="#faq"]', landingCopy.header.nav.faq);
  setTextContent('.header-cta', landingCopy.header.cta);
}

// Function to populate hero section
function populateHero() {
  setTextContent('#hero h1', landingCopy.hero.headline);
  setHTMLContent('#hero .hero-subtitle', landingCopy.hero.subtitleHTML);
  setTextContent('#hero .primary-cta', landingCopy.hero.cta.primary);
  setHTMLContent('#hero .trust-text', landingCopy.hero.trustHTML);
}

// Function to populate problem section
function populateProblem() {
  setTextContent('#problem h2', landingCopy.problem.headline);
  
  const problemItems = document.querySelectorAll('#problem .problem-item');
  landingCopy.problem.items.forEach((item, index) => {
    if (problemItems[index]) {
      setTextContent(`#problem .problem-item:nth-child(${index + 1}) h3`, item.title);
      setTextContent(`#problem .problem-item:nth-child(${index + 1}) p`, item.description);
    }
  });
}

// Function to populate app screenshot section
function populateAppScreenshot() {
  setTextContent('#app-screenshot h2', landingCopy.appScreenshot.headline);
  setTextContent('#app-screenshot .screenshot-subtitle', landingCopy.appScreenshot.subtitle);
}

// Function to populate note from builder section
function populateNoteFromBuilder() {
  setTextContent('#note-from-builder h2', landingCopy.noteFromBuilder.headline);
  
  const contentParagraphs = document.querySelectorAll('#note-from-builder .builder-content p');
  landingCopy.noteFromBuilder.content.forEach((paragraph, index) => {
    if (contentParagraphs[index]) {
      setTextContent(`#note-from-builder .builder-content p:nth-child(${index + 1})`, paragraph);
    }
  });
  
  setTextContent('#note-from-builder .builder-signature strong', landingCopy.noteFromBuilder.signature.name);
  setTextContent('#note-from-builder .builder-signature span', landingCopy.noteFromBuilder.signature.title);
}

// Function to populate how it works section
function populateHowItWorks() {
  setTextContent('#how-it-works h2', landingCopy.howItWorks.headline);
  
  const steps = document.querySelectorAll('#how-it-works .step');
  landingCopy.howItWorks.steps.forEach((step, index) => {
    if (steps[index]) {
      setTextContent(`#how-it-works .step:nth-child(${index + 1}) .step-number`, step.number);
      setTextContent(`#how-it-works .step:nth-child(${index + 1}) h3`, step.title);
      setTextContent(`#how-it-works .step:nth-child(${index + 1}) p`, step.description);
    }
  });
  
  setTextContent('#how-it-works .primary-cta', landingCopy.howItWorks.cta.primary);
  setTextContent('#how-it-works .trust-text', landingCopy.howItWorks.cta.trustText);
}

// Function to populate projects screenshot section
function populateProjectsScreenshot() {
  setTextContent('#projects-screenshot h2', landingCopy.projectsScreenshot.headline);
  setTextContent('#projects-screenshot .screenshot-subtitle', landingCopy.projectsScreenshot.subtitle);
}

// Function to populate text conversations section
function populateTextConversations() {
  setTextContent('#text-conversations h2', landingCopy.textConversations.headline);
  setTextContent('#text-conversations .screenshot-subtitle', landingCopy.textConversations.subtitle);
}

// Function to populate features section
function populateFeatures() {
  setTextContent('#features h2', landingCopy.features.headline);
  
  const featureItems = document.querySelectorAll('#features .feature');
  landingCopy.features.items.forEach((feature, index) => {
    if (featureItems[index]) {
      setTextContent(`#features .feature:nth-child(${index + 1}) h3`, feature.title);
      setTextContent(`#features .feature:nth-child(${index + 1}) p`, feature.description);
    }
  });
}

// Function to populate before/after section
function populateBeforeAfter() {
  setTextContent('#before-after h2', landingCopy.beforeAfter.headline);
  
  setTextContent('#before-after .before h3', landingCopy.beforeAfter.before.title);
  setTextContent('#before-after .after h3', landingCopy.beforeAfter.after.title);
  
  const beforeItems = document.querySelectorAll('#before-after .before ul li');
  landingCopy.beforeAfter.before.items.forEach((item, index) => {
    if (beforeItems[index]) {
      setTextContent(`#before-after .before ul li:nth-child(${index + 1})`, item);
    }
  });
  
  const afterItems = document.querySelectorAll('#before-after .after ul li');
  landingCopy.beforeAfter.after.items.forEach((item, index) => {
    if (afterItems[index]) {
      setTextContent(`#before-after .after ul li:nth-child(${index + 1})`, item);
    }
  });
}

// Function to populate CTA section
function populateCtaSection() {
  setTextContent('#cta-section h2', landingCopy.ctaSection.headline);
  setTextContent('#cta-section p', landingCopy.ctaSection.description);
  
  const benefits = document.querySelectorAll('#cta-section .benefit');
  landingCopy.ctaSection.benefits.forEach((benefit, index) => {
    if (benefits[index]) {
      setTextContent(`#cta-section .benefit:nth-child(${index + 1})`, benefit);
    }
  });
  
  setTextContent('#cta-section .primary-cta', landingCopy.ctaSection.cta);
  setTextContent('#cta-section .trust-text', landingCopy.ctaSection.trustText);
}

// Function to populate FAQ section
function populateFaq() {
  setTextContent('#faq h2', landingCopy.faq.headline);
  
  const faqItems = document.querySelectorAll('#faq .faq-item');
  landingCopy.faq.items.forEach((faq, index) => {
    if (faqItems[index]) {
      setTextContent(`#faq .faq-item:nth-child(${index + 1}) h3`, faq.question);
      setTextContent(`#faq .faq-item:nth-child(${index + 1}) p`, faq.answer);
    }
  });
}

// Function to populate final CTA section
function populateFinalCta() {
  setTextContent('#final-cta h2', landingCopy.finalCta.headline);
  setTextContent('#final-cta p', landingCopy.finalCta.description);
  setTextContent('#final-cta .primary-cta', landingCopy.finalCta.cta);
}

// Function to populate footer
function populateFooter() {
  setTextContent('footer .footer-section:nth-child(1) h4', landingCopy.footer.buildflow.title);
  setTextContent('footer .footer-section:nth-child(1) p', landingCopy.footer.buildflow.description);
  
  setTextContent('footer .footer-section:nth-child(2) h4', landingCopy.footer.product.title);
  setTextContent('footer .footer-section:nth-child(3) h4', landingCopy.footer.support.title);
  setTextContent('footer .footer-section:nth-child(4) h4', landingCopy.footer.legal.title);
  
  setTextContent('footer .footer-bottom p', landingCopy.footer.bottom);
}

// Main function to populate all content
function populateAllContent() {
  try {
    populateHeader();
    populateHero();
    populateProblem();
    populateAppScreenshot();
    populateNoteFromBuilder();
    populateHowItWorks();
    populateProjectsScreenshot();
    populateTextConversations();
    populateFeatures();
    populateBeforeAfter();
    populateCtaSection();
    populateFaq();
    populateFinalCta();
    populateFooter();
    
    console.log('BuildFlow landing page content loaded successfully');
  } catch (error) {
    console.error('Error loading BuildFlow content:', error);
  }
}

// Export the main function
export { populateAllContent };

// Auto-populate when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', populateAllContent);
} else {
  populateAllContent();
}
