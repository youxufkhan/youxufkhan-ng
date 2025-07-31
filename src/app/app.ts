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
import { ProfileService, Profile, ProfileResponse } from './services/profile.service';
import { DatePipe, CommonModule, NgIf } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NgIf, RouterOutlet, AboutComponent, ExperienceComponent, SkillsComponent, EducationComponent, TestimonialsComponent, ContactComponent, FooterComponent, ProfileComponent, NavigationComponent, DatePipe],
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

  constructor(private profileService: ProfileService) {}

  /**
   * Get the full URL for the profile picture by combining the Strapi base URL with the relative path
   */
  getProfilePicUrl(relativeUrl: string | undefined): string {
    if (!relativeUrl) return '';
    return `${environment.strapiBaseUrl}${relativeUrl}`;
  }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.profileLoading = true;
    this.profileError = null;
    this.profileService.getProfile().subscribe({
      next: (res: ProfileResponse) => {
        this.profile = res.data;
        this.profilePictureUrl = this.getProfilePicUrl(this.profile?.profilePic?.url);
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
