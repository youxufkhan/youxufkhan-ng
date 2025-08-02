import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private appInitializingSubject = new BehaviorSubject<boolean>(true);
  
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  public appInitializing$: Observable<boolean> = this.appInitializingSubject.asObservable();

  constructor() {
    // Simulate app initialization for 2 seconds
    setTimeout(() => {
      this.setAppInitializing(false);
    }, 2000);
  }

  show(): void {
    this.isLoadingSubject.next(true);
  }

  hide(): void {
    this.isLoadingSubject.next(false);
  }

  setAppInitializing(initializing: boolean): void {
    this.appInitializingSubject.next(initializing);
  }

  // Helper method to show loader during API calls
  withLoader<T>(observable: Observable<T>): Observable<T> {
    this.show();
    return new Observable(observer => {
      observable.subscribe({
        next: (value) => {
          observer.next(value);
        },
        error: (error) => {
          observer.error(error);
        },
        complete: () => {
          this.hide();
          observer.complete();
        }
      });
    });
  }
} 