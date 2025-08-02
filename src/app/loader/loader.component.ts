import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading = false;
  appInitializing = true;
  private subscriptions: Subscription[] = [];
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private drops: number[] = [];
  private fontSize = 14;
  private columns = 0;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.loaderService.isLoading$.subscribe(loading => {
        this.isLoading = loading;
        if (loading) {
          this.startMatrixAnimation();
        } else {
          this.stopMatrixAnimation();
        }
      }),
      this.loaderService.appInitializing$.subscribe(initializing => {
        this.appInitializing = initializing;
        if (initializing) {
          this.startMatrixAnimation();
        } else {
          this.stopMatrixAnimation();
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.stopMatrixAnimation();
  }

  private setupCanvas(): void {
    this.canvas = document.getElementById('loader-canvas') as HTMLCanvasElement;
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')!;
      this.resizeCanvas();
    }
  }

  private resizeCanvas(): void {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.columns = Math.floor(this.canvas.width / this.fontSize);
      this.drops = Array(this.columns).fill(1);
    }
  }

  private startMatrixAnimation(): void {
    if (this.animationId) return;
    
    this.resizeCanvas();
    this.animate();
  }

  private stopMatrixAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate = (): void => {
    if (!this.ctx || !this.canvas) return;

    // Clear with fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Set text properties
    this.ctx.fillStyle = '#0dff00';
    this.ctx.font = `${this.fontSize}px monospace`;

    // Draw matrix characters
    for (let i = 0; i < this.drops.length; i++) {
      const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
      
      // Reset drop when it reaches bottom
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  get shouldShow(): boolean {
    return this.isLoading || this.appInitializing;
  }
} 