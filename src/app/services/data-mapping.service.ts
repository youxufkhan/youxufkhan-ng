import { Injectable } from '@angular/core';
import { Profile, Experience, SkillCategory, Education, Testimonial } from './profile.service';
import { environment } from '../../environments/environment';

// Simplified interfaces for components
export interface SimpleExperience {
  title: string;
  companyName: string;
  startDate: string;
  endDate: string | null;
  location: string;
  jobBullets: string[];
}

export interface SimpleSkillCategory {
  type: string;
  skills: string[];
}

export interface SimpleEducation {
  degree: string;
  fieldOfStudy: string;
  instituteName: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface SimpleTestimonial {
  name: string;
  title: string;
  url: string;
  content: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataMappingService {
  /**
   * Get the full URL for the profile picture by combining the Strapi base URL with the relative path
   */
  getProfilePicUrl(relativeUrl: string | undefined): string {
    if (!relativeUrl) return '';
    return relativeUrl;
    // Uncomment the line below if you need to prepend the Strapi base URL
    // return `${environment.strapiBaseUrl}${relativeUrl}`;
  }

  /**
   * Map experiences from the profile response to a simpler format for the component
   */
  mapExperiences(experiences: Experience[]): SimpleExperience[] {
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
  mapSkills(skills: SkillCategory[]): SimpleSkillCategory[] {
    return skills.map(skillCategory => ({
      type: skillCategory.type,
      skills: skillCategory.skills.map(skill => skill.text)
    }));
  }

  /**
   * Map education from the profile response to a simpler format for the component
   */
  mapEducation(educations: Education[]): SimpleEducation[] {
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
  mapTestimonials(testimonials: Testimonial[]): SimpleTestimonial[] {
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
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
} 