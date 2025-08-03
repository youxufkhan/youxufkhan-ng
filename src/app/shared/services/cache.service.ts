import { Injectable } from '@angular/core';

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  version: string;
  expiresAt: number;
}

export interface CacheConfig {
  key: string;
  version: string;
  ttl: number; // Time to live in milliseconds
  maxAge?: number; // Maximum age in milliseconds (optional)
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly CACHE_PREFIX = 'youxufkhan_cache_';
  private readonly VERSION_KEY = 'cache_version';
  private readonly DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes
  private readonly MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Set cache item with smart expiration
   */
  set<T>(config: CacheConfig, data: T): void {
    try {
      const now = Date.now();
      const expiresAt = now + (config.ttl || this.DEFAULT_TTL);
      
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: now,
        version: config.version,
        expiresAt
      };

      const key = this.getCacheKey(config.key);
      localStorage.setItem(key, JSON.stringify(cacheItem));
      
      // Store version for cache invalidation
      this.setVersion(config.key, config.version);
      
      console.log(`Cache set: ${config.key} (expires: ${new Date(expiresAt).toLocaleString()})`);
    } catch (error) {
      console.warn('Failed to set cache:', error);
      this.clearCache(config.key);
    }
  }

  /**
   * Get cache item with validation
   */
  get<T>(config: CacheConfig): T | null {
    try {
      const key = this.getCacheKey(config.key);
      const cached = localStorage.getItem(key);
      
      if (!cached) {
        return null;
      }

      const cacheItem: CacheItem<T> = JSON.parse(cached);
      
      // Check if cache is expired
      if (this.isExpired(cacheItem, config)) {
        console.log(`Cache expired: ${config.key}`);
        this.clearCache(config.key);
        return null;
      }

      // Check version mismatch
      if (cacheItem.version !== config.version) {
        console.log(`Cache version mismatch: ${config.key} (expected: ${config.version}, got: ${cacheItem.version})`);
        this.clearCache(config.key);
        return null;
      }

      // Check max age
      if (config.maxAge && this.isTooOld(cacheItem, config.maxAge)) {
        console.log(`Cache too old: ${config.key}`);
        this.clearCache(config.key);
        return null;
      }

      console.log(`Cache hit: ${config.key} (age: ${this.getAge(cacheItem)}ms)`);
      return cacheItem.data;
    } catch (error) {
      console.warn('Failed to get cache:', error);
      this.clearCache(config.key);
      return null;
    }
  }

  /**
   * Check if cache exists and is valid
   */
  has(config: CacheConfig): boolean {
    return this.get(config) !== null;
  }

  /**
   * Clear specific cache
   */
  clearCache(key: string): void {
    try {
      const cacheKey = this.getCacheKey(key);
      localStorage.removeItem(cacheKey);
      this.clearVersion(key);
      console.log(`Cache cleared: ${key}`);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  /**
   * Clear all application cache
   */
  clearAllCache(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      console.log('All cache cleared');
    } catch (error) {
      console.warn('Failed to clear all cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { totalItems: number; totalSize: number; keys: string[] } {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
      let totalSize = 0;
      
      cacheKeys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          totalSize += new Blob([item]).size;
        }
      });

      return {
        totalItems: cacheKeys.length,
        totalSize,
        keys: cacheKeys.map(key => key.replace(this.CACHE_PREFIX, ''))
      };
    } catch (error) {
      console.warn('Failed to get cache stats:', error);
      return { totalItems: 0, totalSize: 0, keys: [] };
    }
  }

  /**
   * Clean expired cache items
   */
  cleanExpiredCache(): void {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
      
      cacheKeys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const cacheItem: CacheItem<any> = JSON.parse(item);
            if (this.isExpired(cacheItem, { ttl: this.DEFAULT_TTL })) {
              localStorage.removeItem(key);
              console.log(`Cleaned expired cache: ${key}`);
            }
          } catch (error) {
            // Remove invalid cache items
            localStorage.removeItem(key);
            console.log(`Cleaned invalid cache: ${key}`);
          }
        }
      });
    } catch (error) {
      console.warn('Failed to clean expired cache:', error);
    }
  }

  private getCacheKey(key: string): string {
    return `${this.CACHE_PREFIX}${key}`;
  }

  private isExpired<T>(cacheItem: CacheItem<T>, config: { ttl: number }): boolean {
    const now = Date.now();
    return now > cacheItem.expiresAt;
  }

  private isTooOld<T>(cacheItem: CacheItem<T>, maxAge: number): boolean {
    const now = Date.now();
    return (now - cacheItem.timestamp) > maxAge;
  }

  private getAge<T>(cacheItem: CacheItem<T>): number {
    return Date.now() - cacheItem.timestamp;
  }

  private setVersion(key: string, version: string): void {
    try {
      const versionKey = `${this.CACHE_PREFIX}${key}_version`;
      localStorage.setItem(versionKey, version);
    } catch (error) {
      console.warn('Failed to set cache version:', error);
    }
  }

  private clearVersion(key: string): void {
    try {
      const versionKey = `${this.CACHE_PREFIX}${key}_version`;
      localStorage.removeItem(versionKey);
    } catch (error) {
      console.warn('Failed to clear cache version:', error);
    }
  }
} 