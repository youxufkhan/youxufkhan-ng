import { Component, signal, HostListener, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileService, Profile, ProfileResponse } from './services/profile.service';
import { DatePipe, CommonModule, NgIf } from '@angular/common';
import { TechnologiesComponent } from './technologies/technologies.component';
import { MatrixCursorComponent } from "./matrix-cursor/matrix-cursor";
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { MatrixEffectService } from './services/matrix-effect.service';
import { ScrollRevealService } from './services/scroll-reveal.service';
import { DataMappingService, SimpleExperience, SimpleSkillCategory, SimpleEducation, SimpleTestimonial } from './services/data-mapping.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, 
    NgIf, 
    RouterOutlet, 
    AboutComponent, 
    ExperienceComponent, 
    SkillsComponent, 
    EducationComponent, 
    TestimonialsComponent, 
    ContactComponent, 
    FooterComponent, 
    ProfileComponent, 
    TechnologiesComponent, 
    NavigationComponent, 
    DatePipe, 
    MatrixCursorComponent, 
    LoaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
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

  constructor(
    private profileService: ProfileService, 
    private loaderService: LoaderService,
    private matrixEffectService: MatrixEffectService,
    private scrollRevealService: ScrollRevealService,
    private dataMappingService: DataMappingService
  ) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  ngAfterViewInit(): void {
    this.initializeMatrixEffect();
    this.initialReveal();
  }

  ngOnDestroy(): void {
    // Cleanup is handled by the MatrixEffectService
  }

  /**
   * Initialize the matrix background effect
   */
  private initializeMatrixEffect(): void {
    this.matrixEffectService.initMatrixEffect();
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
  }

  /**
   * Handle window resize event
   */
  @HostListener('window:resize')
  onResize(): void {
    this.matrixEffectService.onResize();
  }

  /**
   * Handle window scroll event
   */
  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollRevealService.reveal();
  }
}
