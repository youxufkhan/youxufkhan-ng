# Shared Interfaces

This directory contains shared interfaces that are used across the application.

## Structure

### `image.interface.ts`
Contains the generic `Image` interface that represents the standard Strapi media object structure. This interface is used by all entities that contain image data.

**Usage:**
```typescript
import { Image } from '../interfaces';

interface MyEntity {
  id: number;
  name: string;
  image?: Image; // Uses the generic Image interface
}
```

### `cache.interface.ts`
Contains cache-related interfaces used by the `CacheService`.

- `CacheItem<T>`: Generic cache item interface
- `CacheConfig`: Cache configuration interface

**Usage:**
```typescript
import { CacheItem, CacheConfig } from '../interfaces';
```

### `index.ts`
Exports all shared interfaces for easier imports.

**Usage:**
```typescript
import { Image, CacheItem, CacheConfig } from '../interfaces';
```

## Benefits

1. **DRY Principle**: The generic `Image` interface eliminates code duplication across entities
2. **Consistency**: All image objects follow the same structure
3. **Maintainability**: Changes to image structure only need to be made in one place
4. **Type Safety**: Strong typing ensures consistency across the application
5. **Reusability**: Interfaces can be easily imported and used across different modules 