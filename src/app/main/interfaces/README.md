# Main Interfaces

This directory contains interfaces specific to the main application domain.

## Structure

### `profile.interface.ts`
Contains all profile-related interfaces that match the Strapi API response structure.

**Interfaces:**
- `JobBullet`: Job bullet items for experience entries
- `Experience`: Work experience entries with company images
- `SkillItem`: Individual skill items
- `SkillCategory`: Skill categories with multiple skills
- `Education`: Education entries
- `Project`: Project entries with logo images
- `Testimonial`: Testimonial entries with profile images
- `Profile`: Main profile data structure
- `ProfileResponse`: Strapi API response wrapper

**Usage:**
```typescript
import { Profile, Experience, Project } from '../interfaces';
```

### `simple.interface.ts`
Contains simplified interfaces used by components. These are transformed versions of the complex Strapi interfaces.

**Interfaces:**
- `SimpleExperience`: Simplified experience for components
- `SimpleSkillCategory`: Simplified skill category for components
- `SimpleEducation`: Simplified education for components
- `SimpleTestimonial`: Simplified testimonial for components
- `SimpleProject`: Simplified project for components

**Usage:**
```typescript
import { SimpleExperience, SimpleProject } from '../interfaces';
```

### `index.ts`
Exports all main interfaces for easier imports.

**Usage:**
```typescript
import { Profile, SimpleExperience, Project } from '../interfaces';
```

## Design Principles

1. **Separation of Concerns**: Complex Strapi interfaces are separated from simplified component interfaces
2. **Data Transformation**: The `DataMappingService` transforms complex interfaces to simple ones
3. **Type Safety**: All interfaces provide strong typing for better development experience
4. **Reusability**: Interfaces can be imported and used across different components and services
5. **Maintainability**: Changes to API structure only require updates to profile interfaces

## Image Handling

All entities that contain images use the generic `Image` interface from `../../shared/interfaces/image.interface.ts`:

```typescript
import { Image } from '../../shared/interfaces';

interface Experience {
  // ... other properties
  companyImage?: Image; // Uses generic Image interface
}
```

This ensures consistency and eliminates code duplication across all image-containing entities. 