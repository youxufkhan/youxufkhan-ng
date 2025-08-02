import { Component, signal, HostListener, AfterViewInit, OnInit } from '@angular/core';
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
import { ProfileService, Profile, ProfileResponse, Experience, SkillCategory, Education, Testimonial } from './services/profile.service';
import { DatePipe, CommonModule, NgIf } from '@angular/common';
import { environment } from '../environments/environment';
import { TechnologiesComponent } from './technologies/technologies.component';
import { MatrixCursorComponent } from "./matrix-cursor/matrix-cursor";
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';

// Simplified experience interface for the component
export interface SimpleExperience {
  title: string;
  companyName: string;
  startDate: string;
  endDate: string | null;
  location: string;
  jobBullets: string[];
}

// Simplified skill category interface for the component
export interface SimpleSkillCategory {
  type: string;
  skills: string[];
}

// Simplified education interface for the component
export interface SimpleEducation {
  degree: string;
  fieldOfStudy: string;
  instituteName: string;
  startDate: string;
  endDate: string;
  location: string;
}

// Simplified testimonial interface for the component
export interface SimpleTestimonial {
  name: string;
  title: string;
  url: string;
  content: string;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, NgIf, RouterOutlet, AboutComponent, ExperienceComponent, SkillsComponent, EducationComponent, TestimonialsComponent, ContactComponent, FooterComponent, ProfileComponent, TechnologiesComponent, NavigationComponent, DatePipe, MatrixCursorComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('youxufkhan-ng');

  // Profile data state
  profile: Profile | null = null;
  profileLoading = false;
  profileError: string | null = null;
  public staticSummary: string = `Senior Software Engineer with over 7 years of experience building robust, scalable, and high-performance\nAPIs within microservices architectures. Expertise in Node.js frameworks like Express.js and Fastify.\nPassionate about crafting efficient backend systems and leading and mentoring teams for successful\nproject delivery.`;
  public defaultTitle: string = 'BACKEND SOFTWARE ENGINEER';
  public profilePictureUrl: string = '';
  
  // Mapped experiences for the experience component
  public mappedExperiences: SimpleExperience[] = [];
  
  // Mapped skills for the skills component
  public mappedSkills: SimpleSkillCategory[] = [];
  
  // Mapped education for the education component
  public mappedEducation: SimpleEducation[] = [];
  
  // Mapped testimonials for the testimonials component
  public mappedTestimonials: SimpleTestimonial[] = [];

  constructor(private profileService: ProfileService, private loaderService: LoaderService) {}

  /**
   * Get the full URL for the profile picture by combining the Strapi base URL with the relative path
   */
  getProfilePicUrl(relativeUrl: string | undefined): string {
    if (!relativeUrl) return '';
    return relativeUrl;
    return `${environment.strapiBaseUrl}${relativeUrl}`;
  }

  /**
   * Map experiences from the profile response to a simpler format for the component
   */
  private mapExperiences(experiences: Experience[]): SimpleExperience[] {
    return experiences.map(exp => ({
      title: exp.title,
      companyName: exp.companyName,
      startDate: exp.startDate,
      endDate: exp.endDate,
      location: exp.location,
      jobBullets: exp.jobBullets.map(bullet => bullet.text)
    }));
  }

  /**
   * Map skills from the profile response to a simpler format for the component
   */
  private mapSkills(skills: SkillCategory[]): SimpleSkillCategory[] {
    return skills.map(skillCategory => ({
      type: skillCategory.type,
      skills: skillCategory.skills.map(skill => skill.text)
    }));
  }

  /**
   * Map education from the profile response to a simpler format for the component
   */
  private mapEducation(educations: Education[]): SimpleEducation[] {
    return educations.map(edu => ({
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      instituteName: edu.instituteName,
      startDate: edu.startDate,
      endDate: edu.endDate,
      location: edu.location
    }));
  }

  /**
   * Map testimonials from the profile response to a simpler format for the component
   */
  private mapTestimonials(testimonials: Testimonial[]): SimpleTestimonial[] {
    return testimonials.map(testimonial => ({
      name: testimonial.name,
      title: testimonial.title,
      url: testimonial.url,
      content: testimonial.content,
      imageUrl: this.getProfilePicUrl(testimonial.image?.url)
    }));
  }

  /**
   * Format date for display
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.profileLoading = true;
    this.profileError = null;
    this.loaderService.withLoader(this.profileService.getProfile()).subscribe({
      next: (res: ProfileResponse) => {
        this.profile = res.data;
        this.profilePictureUrl = this.getProfilePicUrl(this.profile?.profilePic?.url);
        
        // Map experiences if they exist
        if (this.profile?.experiences) {
          this.mappedExperiences = this.mapExperiences(this.profile.experiences);
        }
        
        // Map skills if they exist
        if (this.profile?.skills) {
          this.mappedSkills = this.mapSkills(this.profile.skills);
        }
        
        // Map education if it exists
        if (this.profile?.educations) {
          this.mappedEducation = this.mapEducation(this.profile.educations);
        }
        
        // Map testimonials if they exist
        if (this.profile?.testimonials) {
          this.mappedTestimonials = this.mapTestimonials(this.profile.testimonials);
        }
        
        this.profileLoading = false;
      },
      error: (err) => {
        this.profileError = 'Failed to load profile.';
        this.profileLoading = false;
        console.error('Profile fetch error:', err);
      }
    });
  }

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private fontSize = 16;
  private rainDrops: number[] = [];
  private columns = 0;
  private characters =
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setupCanvas();
    this.setupMatrixRain();
    this.reveal(); // Initial scroll reveal
  }

  private setupCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.rainDrops = Array(this.columns).fill(1);
  }

  private drawMatrix = () => {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#0dff00';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.rainDrops.length; i++) {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      this.ctx.fillText(text, i * this.fontSize, this.rainDrops[i] * this.fontSize);
      if (this.rainDrops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.rainDrops[i] = 0;
      }
      this.rainDrops[i]++;
    }
  };

  private setupMatrixRain(): void {
    setInterval(this.drawMatrix, 50);
  }

  @HostListener('window:resize')
  onResize() {
    this.setupCanvas();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.reveal();
  }

  private reveal(): void {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  }
}
