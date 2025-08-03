import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleEducation } from '../../interfaces';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  @Input() education: SimpleEducation[] = [];

  // Fallback education data when API doesn't return any education
  private fallbackEducation: SimpleEducation[] = [
    {
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      instituteName: 'Sir Syed University of Engineering & Technology',
      startDate: '2016-01-01',
      endDate: '2019-10-10',
      location: 'Karachi, Pakistan'
    },
    {
      degree: 'Intermediate',
      fieldOfStudy: 'Pre-Engineering',
      instituteName: 'Govt. College for Boys (S.R.E Majeed)',
      startDate: '2012-08-01',
      endDate: '2014-05-30',
      location: 'Karachi, Pakistan'
    }
  ];

  /**
   * Get education to display - use API data if available, otherwise use fallback
   */
  get displayEducation(): SimpleEducation[] {
    return this.education.length > 0 ? this.education : this.fallbackEducation;
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }

  /**
   * Get display date range
   */
  getDateRange(startDate: string, endDate: string): string {
    const start = this.formatDate(startDate);
    const end = this.formatDate(endDate);
    return `${start} - ${end}`;
  }
} 