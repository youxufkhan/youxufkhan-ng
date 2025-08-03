import { Component, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent, MatrixCursorComponent } from './shared';
import { MatrixEffectService } from './shared/services/matrix-effect.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoaderComponent,
    MatrixCursorComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = 'youxufkhan-ng';

  constructor(private matrixEffectService: MatrixEffectService) {}

  ngAfterViewInit(): void {
    this.initializeMatrixEffect();
  }

  ngOnDestroy(): void {
    // Cleanup is handled by the MatrixEffectService
  }

  /**
   * Initialize the matrix background effect
   */
  private initializeMatrixEffect(): void {
    this.matrixEffectService.initMatrixEffect();
  }

  /**
   * Handle window resize
   */
  @HostListener('window:resize')
  onResize(): void {
    this.matrixEffectService.onResize();
  }
}
