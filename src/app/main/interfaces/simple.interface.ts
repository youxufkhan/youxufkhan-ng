/**
 * Simplified interfaces for components
 * These interfaces are used by the DataMappingService to transform
 * complex Strapi responses into simpler formats for components
 */

/**
 * Simplified experience interface for components
 */
export interface SimpleExperience {
  title: string;
  companyName: string;
  startDate: string;
  endDate: string | null;
  location: string;
  jobBullets: string[];
  companyImageUrl?: string;
}

/**
 * Simplified skill category interface for components
 */
export interface SimpleSkillCategory {
  type: string;
  skills: string[];
}

/**
 * Simplified education interface for components
 */
export interface SimpleEducation {
  degree: string;
  fieldOfStudy: string;
  instituteName: string;
  startDate: string;
  endDate: string;
  location: string;
}

/**
 * Simplified testimonial interface for components
 */
export interface SimpleTestimonial {
  name: string;
  title: string;
  url: string;
  content: string;
  imageUrl: string;
}

/**
 * Simplified project interface for components
 */
export interface SimpleProject {
  title: string;
  domain: string;
  description: string;
  contribution: string;
  technologies?: string[];
  imageUrl?: string;
  projectUrl?: string;
} 