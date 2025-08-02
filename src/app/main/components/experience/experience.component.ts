import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleExperience } from '../../services/data-mapping.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  @Input() experiences: SimpleExperience[] = [];

  // Fallback experience data when API doesn't return any experiences
  private fallbackExperiences: SimpleExperience[] = [
    {
      title: 'Senior Software Engineer',
      companyName: 'Spursol (ValueLink Software)',
      startDate: '2025-01-01',
      endDate: null,
      location: 'Karachi, Pakistan',
      jobBullets: [
        'Engineered robust data solutions to ensure high availability and performance.',
        'Collaborated with product managers and stakeholders to translate business requirements into technical specifications.',
        'Contributed solutions to achieve the company\'s app modernization goal.',
        'Provided technical guidance and mentorship to team members.'
      ]
    },
    {
      title: 'Senior Software Engineer',
      companyName: 'Bykea Technologies BV (Netherlands)',
      startDate: '2022-01-01',
      endDate: '2025-01-01',
      location: 'Karachi, Pakistan',
      jobBullets: [
        'Participated in the entire application lifecycle, focusing on coding and debugging.',
        'Led teams of engineers, overseeing daily scrums, code reviews, and system design meetings.',
        'Developed a localization microservice from scratch to support multiple languages.',
        'Integrated a payment gateway and worked with PostgreSQL, MongoDB, and Redis.',
        'Optimized application performance by identifying and eliminating slow and redundant operations in APIs.'
      ]
    },
    {
      title: 'Senior Software Engineer',
      companyName: 'Qavi Technologies',
      startDate: '2017-12-01',
      endDate: '2022-01-01',
      location: 'Karachi, Pakistan',
      jobBullets: [
        'Designed, developed, and maintained features for a large-scale warehouse management system (WMS).',
        'Transitioned from frontend to full-stack development (PHP, Node.js).',
        'Implemented a microservices architecture for the WMS.',
        'Coordinated the migration of the WMS from DigitalOcean to AWS.',
        'Progressed from intern to Senior Software Engineer and Team Lead.'
      ]
    }
  ];

  /**
   * Get experiences to display - use API data if available, otherwise use fallback
   */
  get displayExperiences(): SimpleExperience[] {
    return this.experiences.length > 0 ? this.experiences : this.fallbackExperiences;
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  /**
   * Get display date range
   */
  getDateRange(startDate: string, endDate: string | null): string {
    const start = this.formatDate(startDate);
    const end = endDate ? this.formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  }
} 