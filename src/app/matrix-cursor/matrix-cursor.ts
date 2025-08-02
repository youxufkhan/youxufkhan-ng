import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-matrix-cursor',
  imports: [],
  templateUrl: './matrix-cursor.html',
  styleUrl: './matrix-cursor.css'
})
export class MatrixCursorComponent implements AfterViewInit, OnDestroy {
  private mouseMoveListener!: (e: MouseEvent) => void;

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
      
      document.addEventListener('mousemove', this.mouseMoveListener);
    }
  }

  ngOnDestroy(): void {
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
    }
  }
}
