import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SimpleProject, DataMappingService } from '../main/services/data-mapping.service';
import { ScrollRevealService, LoaderService, ProjectsDataService } from '../shared';
import { ProfileResponse } from '../main/services/profile.service';
import { CachedProfileService } from '../main/services/cached-profile.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  // All projects data
  projects: SimpleProject[] = [];
  projectsLoading = false;
  projectsError: string | null = null;

  constructor(
    private router: Router,
    private scrollRevealService: ScrollRevealService,
    private cachedProfileService: CachedProfileService,
    private loaderService: LoaderService,
    private dataMappingService: DataMappingService,
    private projectsDataService: ProjectsDataService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  /**
   * Load projects data - first check if available from service, otherwise fetch from API
   */
  loadProjects(): void {
    // Check if projects data is already available from the shared service
    if (this.projectsDataService.hasCurrentProjectsData()) {
      this.projects = this.projectsDataService.getCurrentProjects();
      return;
    }

    // If not available, fetch from API
    this.fetchProjects();
  }

  /**
   * Fetch projects data from the API with caching
   */
  fetchProjects(): void {
    this.projectsLoading = true;
    this.projectsError = null;
    
    this.loaderService.withLoader(this.cachedProfileService.getProfile()).subscribe({
      next: (res: ProfileResponse) => {
        this.handleProjectsSuccess(res);
      },
      error: (err) => {
        this.handleProjectsError(err);
      }
    });
  }

  /**
   * Handle successful projects fetch
   */
  private handleProjectsSuccess(res: ProfileResponse): void {
    if (res.data.projects) {
      this.projects = this.dataMappingService.mapProjects(res.data.projects);
      // Store the projects data in the shared service for future use
      this.projectsDataService.setProjects(this.projects);
    }
    this.projectsLoading = false;
  }

  /**
   * Handle projects fetch error
   */
  private handleProjectsError(err: any): void {
    this.projectsError = 'Failed to load projects.';
    this.projectsLoading = false;
    console.error('Projects fetch error:', err);
  }

  ngAfterViewInit(): void {
    this.initialReveal();
  }

  ngOnDestroy(): void {
    // Cleanup is handled by the MatrixEffectService
  }

  /**
   * Perform initial scroll reveal
   */
  private initialReveal(): void {
    this.scrollRevealService.reveal();
  }

  /**
   * Navigate back to home page
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
} 