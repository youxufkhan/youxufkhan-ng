import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixEffectService implements OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private fontSize = 16;
  private rainDrops: number[] = [];
  private columns = 0;
  private animationInterval?: number;
  private isInitialized = false;
  private characters =
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  /**
   * Initialize the matrix effect
   */
  initMatrixEffect(): void {
    // Prevent multiple initializations
    if (this.isInitialized) {
      return;
    }

    this.canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!this.canvas) {
      console.warn('Matrix canvas element not found');
      return;
    }
    
    this.ctx = this.canvas.getContext('2d')!;
    this.setupCanvas();
    this.setupMatrixRain();
    this.isInitialized = true;
  }

  /**
   * Setup canvas dimensions and initialize rain drops
   */
  private setupCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.rainDrops = Array(this.columns).fill(1);
  }

  /**
   * Draw the matrix rain effect
   */
  private drawMatrix = (): void => {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#0dff00';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.rainDrops.length; i++) {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      this.ctx.fillText(text, i * this.fontSize, this.rainDrops[i] * this.fontSize);
      if (this.rainDrops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.rainDrops[i] = 0;
      }
      this.rainDrops[i]++;
    }
  };

  /**
   * Start the matrix rain animation
   */
  private setupMatrixRain(): void {
    // Clear any existing interval before creating a new one
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    this.animationInterval = window.setInterval(this.drawMatrix, 50);
  }

  /**
   * Handle window resize
   */
  onResize(): void {
    if (this.isInitialized) {
      this.setupCanvas();
    }
  }

  /**
   * Clean up resources
   */
  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    this.isInitialized = false;
  }
} 