# Shared Module

This module contains reusable services and components that can be used across different modules in the application.

## Services

### LoaderService
Provides loading state management with matrix animation effects.

**Usage:**
```typescript
import { LoaderService } from '../shared';

constructor(private loaderService: LoaderService) {}

// Show loader
this.loaderService.showLoader();

// Hide loader
this.loaderService.hideLoader();

// Wrap observable with loader
this.loaderService.withLoader(observable).subscribe(...);
```

### MatrixEffectService
Manages the matrix background effect animation.

**Usage:**
```typescript
import { MatrixEffectService } from '../shared';

constructor(private matrixEffectService: MatrixEffectService) {}

// Initialize matrix effect
this.matrixEffectService.initMatrixEffect();

// Handle resize
this.matrixEffectService.onResize();
```

### ScrollRevealService
Manages scroll reveal animations for elements.

**Usage:**
```typescript
import { ScrollRevealService } from '../shared';

constructor(private scrollRevealService: ScrollRevealService) {}

// Trigger reveal
this.scrollRevealService.reveal();
```

## Components

### LoaderComponent
Displays a loading screen with matrix animation.

**Usage:**
```typescript
import { LoaderComponent } from '../shared';

@Component({
  imports: [LoaderComponent],
  template: '<app-loader></app-loader>'
})
```

### MatrixCursorComponent
Provides a custom matrix-style cursor effect.

**Usage:**
```typescript
import { MatrixCursorComponent } from '../shared';

@Component({
  imports: [MatrixCursorComponent],
  template: '<app-matrix-cursor></app-matrix-cursor>'
})
```

## Importing

Use the barrel import for cleaner imports:

```typescript
import { 
  LoaderService, 
  MatrixEffectService, 
  ScrollRevealService,
  LoaderComponent,
  MatrixCursorComponent 
} from '../shared';
```

## Adding New Shared Items

1. Add the service/component to the appropriate directory
2. Export it from `src/app/shared/index.ts`
3. Add it to the app configuration providers if it's a service
4. Update this README with usage documentation 