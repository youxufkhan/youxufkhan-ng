import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matrix-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matrix-cursor.html',
  styleUrl: './matrix-cursor.css'
})
export class MatrixCursorComponent implements AfterViewInit, OnDestroy {
  private mouseMoveListener!: (e: MouseEvent) => void;
  private mouseEnterListener!: (e: MouseEvent) => void;
  private mouseLeaveListener!: (e: MouseEvent) => void;

  ngAfterViewInit(): void {
    const customCursor = document.getElementById('custom-cursor');

    if (customCursor) {
      this.mouseMoveListener = (e: MouseEvent) => {
        // Update the main cursor's position
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';

        // Create a new trail particle
        const trailParticle = document.createElement('span');
        trailParticle.className = 'trail-particle';
        
        // Generate a random character from the ASCII range 33-126
        const randomChar = String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1)) + 33);
        trailParticle.textContent = randomChar;
        
        // Set the position of the trail particle
        trailParticle.style.left = e.clientX + 'px';
        trailParticle.style.top = e.clientY + 'px';
        
        // Append the new particle to the body
        document.body.appendChild(trailParticle);
        
        // Add the fade class after a short delay to trigger the CSS transition
        setTimeout(() => {
          trailParticle.classList.add('fade');
        }, 10);
        
        // Remove the particle from the DOM after the transition is complete
        setTimeout(() => {
          trailParticle.remove();
        }, 500);
      };

      this.mouseEnterListener = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (this.isInteractiveElement(target)) {
          customCursor.classList.add('cursor-clicker');
        }
      };

      this.mouseLeaveListener = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (this.isInteractiveElement(target)) {
          customCursor.classList.remove('cursor-clicker');
        }
      };
      
      document.addEventListener('mousemove', this.mouseMoveListener);
      document.addEventListener('mouseenter', this.mouseEnterListener, true);
      document.addEventListener('mouseleave', this.mouseLeaveListener, true);
    }
  }

  private isInteractiveElement(element: HTMLElement): boolean {
    // Check if the element or any of its parents is interactive
    let currentElement: HTMLElement | null = element;
    while (currentElement) {
      const tagName = currentElement.tagName.toLowerCase();
      const className = currentElement.className || '';
      
      // Check for interactive elements
      if (tagName === 'a' || tagName === 'button' || 
          currentElement.onclick || 
          currentElement.getAttribute('role') === 'button' ||
          className.includes('nav-link') ||
          className.includes('contact-link') ||
          currentElement.style.cursor === 'pointer') {
        return true;
      }
      
      currentElement = currentElement.parentElement;
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseEnterListener) {
      document.removeEventListener('mouseenter', this.mouseEnterListener, true);
    }
    if (this.mouseLeaveListener) {
      document.removeEventListener('mouseleave', this.mouseLeaveListener, true);
    }
  }
}
