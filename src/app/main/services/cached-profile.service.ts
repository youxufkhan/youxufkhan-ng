import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProfileService } from './profile.service';
import { ProfileResponse } from '../interfaces';
import { CacheService } from '../../shared/services/cache.service';
import { CacheConfig } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CachedProfileService {
  private readonly PROFILE_CACHE_KEY = 'profile_data';
  private readonly PROFILE_CACHE_VERSION = '1.0.0';
  private readonly PROFILE_CACHE_TTL = 15 * 60 * 1000; // 15 minutes
  private readonly PROFILE_CACHE_MAX_AGE = 2 * 60 * 60 * 1000; // 2 hours

  constructor(
    private profileService: ProfileService,
    private cacheService: CacheService
  ) {
    // Clean expired cache on service initialization
    this.cacheService.cleanExpiredCache();
  }

  /**
   * Get profile data with smart caching
   */
  getProfile(): Observable<ProfileResponse> {
    const cacheConfig: CacheConfig = {
      key: this.PROFILE_CACHE_KEY,
      version: this.PROFILE_CACHE_VERSION,
      ttl: this.PROFILE_CACHE_TTL,
      maxAge: this.PROFILE_CACHE_MAX_AGE
    };

    // Try to get from cache first
    const cachedData = this.cacheService.get<ProfileResponse>(cacheConfig);
    
    if (cachedData) {
      console.log('Profile data served from cache');
      return of(cachedData);
    }

    // If not in cache, fetch from API
    console.log('Profile data not in cache, fetching from API');
    return this.profileService.getProfile().pipe(
      tap((response: ProfileResponse) => {
        // Cache the successful response
        this.cacheService.set(cacheConfig, response);
        console.log('Profile data cached successfully');
      }),
      catchError((error) => {
        console.error('Failed to fetch profile data:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Force refresh profile data (bypass cache)
   */
  refreshProfile(): Observable<ProfileResponse> {
    console.log('Force refreshing profile data');
    this.cacheService.clearCache(this.PROFILE_CACHE_KEY);
    
    return this.profileService.getProfile().pipe(
      tap((response: ProfileResponse) => {
        const cacheConfig: CacheConfig = {
          key: this.PROFILE_CACHE_KEY,
          version: this.PROFILE_CACHE_VERSION,
          ttl: this.PROFILE_CACHE_TTL,
          maxAge: this.PROFILE_CACHE_MAX_AGE
        };
        this.cacheService.set(cacheConfig, response);
        console.log('Profile data refreshed and cached');
      }),
      catchError((error) => {
        console.error('Failed to refresh profile data:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Clear profile cache
   */
  clearProfileCache(): void {
    this.cacheService.clearCache(this.PROFILE_CACHE_KEY);
  }

  /**
   * Check if profile data is cached
   */
  isProfileCached(): boolean {
    const cacheConfig: CacheConfig = {
      key: this.PROFILE_CACHE_KEY,
      version: this.PROFILE_CACHE_VERSION,
      ttl: this.PROFILE_CACHE_TTL,
      maxAge: this.PROFILE_CACHE_MAX_AGE
    };
    return this.cacheService.has(cacheConfig);
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.cacheService.getCacheStats();
  }

  /**
   * Clear all cache
   */
  clearAllCache(): void {
    this.cacheService.clearAllCache();
  }
} 