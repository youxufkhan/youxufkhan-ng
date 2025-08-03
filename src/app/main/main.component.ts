import { Component, signal, HostListener, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService, Profile, ProfileResponse } from './services/profile.service';
import { LoaderService, ScrollRevealService, ProjectsDataService } from '../shared';
import { DataMappingService, SimpleExperience, SimpleSkillCategory, SimpleEducation, SimpleTestimonial, SimpleProject } from './services/data-mapping.service';

// Import all components
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EducationComponent } from './components/education/education.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';

// Import shared components

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    EducationComponent,
    TestimonialsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    ProfileComponent,
    TechnologiesComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  protected readonly title = signal('youxufkhan-ng');

  // Profile data state
  profile: Profile | null = null;
  profileLoading = false;
  profileError: string | null = null;
  
  // Default values
  public staticSummary: string = `Senior Software Engineer with over 7 years of experience building robust, scalable, and high-performance
APIs within microservices architectures. Expertise in Node.js frameworks like Express.js and Fastify.
Passionate about crafting efficient backend systems and leading and mentoring teams for successful
project delivery.`;
  public defaultTitle: string = 'BACKEND SOFTWARE ENGINEER';
  public profilePictureUrl: string = '';
  
  // Mapped data for components
  public mappedExperiences: SimpleExperience[] = [];
  public mappedSkills: SimpleSkillCategory[] = [];
  public mappedEducation: SimpleEducation[] = [];
  public mappedTestimonials: SimpleTestimonial[] = [];
  public mappedProjects: SimpleProject[] = [];

  constructor(
    private profileService: ProfileService, 
    private loaderService: LoaderService,
    private scrollRevealService: ScrollRevealService,
    private dataMappingService: DataMappingService,
    private projectsDataService: ProjectsDataService
  ) {}

  ngOnInit(): void {
    this.fetchProfile();
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
   * Fetch profile data from the API
   */
  fetchProfile(): void {
    this.profileLoading = true;
    this.profileError = null;
    
    this.loaderService.withLoader(this.profileService.getProfile()).subscribe({
      next: (res: ProfileResponse) => {
        this.handleProfileSuccess(res);
      },
      error: (err) => {
        this.handleProfileError(err);
      }
    });
  }

  /**
   * Handle successful profile fetch
   */
  private handleProfileSuccess(res: ProfileResponse): void {
    this.profile = res.data;
    this.profilePictureUrl = this.dataMappingService.getProfilePicUrl(this.profile?.profilePic?.url);
    
    // Map all profile data
    this.mapProfileData();
    
    this.profileLoading = false;
  }

  /**
   * Handle profile fetch error
   */
  private handleProfileError(err: any): void {
    this.profileError = 'Failed to load profile.';
    this.profileLoading = false;
    console.error('Profile fetch error:', err);
  }

  /**
   * Map all profile data to simplified formats for components
   */
  private mapProfileData(): void {
    if (!this.profile) return;

    // Map experiences
    if (this.profile.experiences) {
      this.mappedExperiences = this.dataMappingService.mapExperiences(this.profile.experiences);
    }
    
    // Map skills
    if (this.profile.skills) {
      this.mappedSkills = this.dataMappingService.mapSkills(this.profile.skills);
    }
    
    // Map education
    if (this.profile.educations) {
      this.mappedEducation = this.dataMappingService.mapEducation(this.profile.educations);
    }
    
    // Map testimonials
    if (this.profile.testimonials) {
      this.mappedTestimonials = this.dataMappingService.mapTestimonials(this.profile.testimonials);
    }

    // Map projects
    if (this.profile.projects) {
      this.mappedProjects = this.dataMappingService.mapProjects(this.profile.projects);
      // Share projects data with the service for other components
      this.projectsDataService.setProjects(this.mappedProjects);
    }
  }

  /**
   * Handle window resize event
   */
  @HostListener('window:resize')
  onResize(): void {
    // MatrixEffectService.onResize(); // This line is removed as per the edit hint
  }

  /**
   * Handle window scroll event
   */
  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollRevealService.reveal();
  }
} 