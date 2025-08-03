import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimpleProject } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  private projectsSubject = new BehaviorSubject<SimpleProject[]>([]);
  private hasDataSubject = new BehaviorSubject<boolean>(false);

  /**
   * Set projects data (called from main component after API fetch)
   */
  setProjects(projects: SimpleProject[]): void {
    this.projectsSubject.next(projects);
    this.hasDataSubject.next(true);
  }

  /**
   * Get projects data as observable
   */
  getProjects(): Observable<SimpleProject[]> {
    return this.projectsSubject.asObservable();
  }

  /**
   * Get current projects data synchronously
   */
  getCurrentProjects(): SimpleProject[] {
    return this.projectsSubject.value;
  }

  /**
   * Check if projects data is available
   */
  hasProjectsData(): Observable<boolean> {
    return this.hasDataSubject.asObservable();
  }

  /**
   * Check if projects data is available synchronously
   */
  hasCurrentProjectsData(): boolean {
    return this.hasDataSubject.value;
  }

  /**
   * Clear projects data (useful for cleanup)
   */
  clearProjects(): void {
    this.projectsSubject.next([]);
    this.hasDataSubject.next(false);
  }
} 