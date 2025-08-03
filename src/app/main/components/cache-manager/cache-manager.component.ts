import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CachedProfileService } from '../../services/cached-profile.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cache-manager',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cache-manager" *ngIf="showCacheManager">
      <div class="cache-info">
        <h4>Cache Status</h4>
        <div class="cache-stats">
          <span class="cache-stat">
            <strong>Items:</strong> {{ cacheStats.totalItems }}
          </span>
          <span class="cache-stat">
            <strong>Size:</strong> {{ formatBytes(cacheStats.totalSize) }}
          </span>
          <span class="cache-stat">
            <strong>Profile Cached:</strong> 
            <span [class]="isProfileCached ? 'cached' : 'not-cached'">
              {{ isProfileCached ? 'Yes' : 'No' }}
            </span>
          </span>
        </div>
        <div class="cache-actions">
          <button 
            (click)="refreshProfile()" 
            class="cache-btn refresh-btn"
            [disabled]="refreshing">
            {{ refreshing ? 'Refreshing...' : 'Refresh Profile' }}
          </button>
          <button 
            (click)="clearProfileCache()" 
            class="cache-btn clear-btn">
            Clear Profile Cache
          </button>
          <button 
            (click)="clearAllCache()" 
            class="cache-btn clear-all-btn">
            Clear All Cache
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cache-manager {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      border: 1px solid rgba(34, 197, 94, 0.5);
      border-radius: 8px;
      padding: 16px;
      color: white;
      font-size: 12px;
      z-index: 1000;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      max-width: 300px;
    }

    .cache-info h4 {
      margin: 0 0 12px 0;
      color: #22c55e;
      font-size: 14px;
    }

    .cache-stats {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
    }

    .cache-stat {
      font-size: 11px;
    }

    .cache-stat strong {
      color: #86efac;
    }

    .cached {
      color: #22c55e;
    }

    .not-cached {
      color: #ef4444;
    }

    .cache-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .cache-btn {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .cache-btn:hover:not(:disabled) {
      background: rgba(34, 197, 94, 0.2);
      border-color: rgba(34, 197, 94, 0.5);
    }

    .cache-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .refresh-btn {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      border-color: rgba(59, 130, 246, 0.3);
    }

    .refresh-btn:hover:not(:disabled) {
      background: rgba(59, 130, 246, 0.2);
      border-color: rgba(59, 130, 246, 0.5);
    }

    .clear-btn {
      background: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
      border-color: rgba(245, 158, 11, 0.3);
    }

    .clear-btn:hover:not(:disabled) {
      background: rgba(245, 158, 11, 0.2);
      border-color: rgba(245, 158, 11, 0.5);
    }

    .clear-all-btn {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.3);
    }

    .clear-all-btn:hover:not(:disabled) {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.5);
    }
  `]
})
export class CacheManagerComponent implements OnInit {
  showCacheManager = false;
  cacheStats: { totalItems: number; totalSize: number; keys: string[] } = { totalItems: 0, totalSize: 0, keys: [] };
  isProfileCached = false;
  refreshing = false;

  constructor(private cachedProfileService: CachedProfileService) {}

  ngOnInit(): void {
    this.updateCacheStats();
    
    // Show cache manager only in development mode
    this.showCacheManager = !environment.production;
  }

  updateCacheStats(): void {
    const stats = this.cachedProfileService.getCacheStats();
    this.cacheStats = {
      totalItems: stats.totalItems,
      totalSize: stats.totalSize,
      keys: stats.keys
    };
    this.isProfileCached = this.cachedProfileService.isProfileCached();
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  refreshProfile(): void {
    this.refreshing = true;
    this.cachedProfileService.refreshProfile().subscribe({
      next: () => {
        this.updateCacheStats();
        this.refreshing = false;
        console.log('Profile refreshed successfully');
      },
      error: (error) => {
        console.error('Failed to refresh profile:', error);
        this.refreshing = false;
      }
    });
  }

  clearProfileCache(): void {
    this.cachedProfileService.clearProfileCache();
    this.updateCacheStats();
    console.log('Profile cache cleared');
  }

  clearAllCache(): void {
    this.cachedProfileService.clearAllCache();
    this.updateCacheStats();
    console.log('All cache cleared');
  }
} 