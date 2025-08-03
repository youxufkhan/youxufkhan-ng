/**
 * Cache-related interfaces for the CacheService
 */

/**
 * Generic cache item interface
 */
export interface CacheItem<T> {
  data: T;
  timestamp: number;
  version: string;
  expiresAt: number;
}

/**
 * Cache configuration interface
 */
export interface CacheConfig {
  key: string;
  version: string;
  ttl: number; // Time to live in milliseconds
  maxAge?: number; // Maximum age in milliseconds (optional)
} 