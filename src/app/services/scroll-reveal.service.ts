import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollRevealService {
  private readonly elementVisible = 150;

  /**
   * Reveal elements when they come into view
   */
  reveal(): void {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - this.elementVisible) {
        element.classList.add('active');
      }
    });
  }

  /**
   * Reset all reveal elements (useful for testing or resetting state)
   */
  resetReveals(): void {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((element) => {
      element.classList.remove('active');
    });
  }
} 