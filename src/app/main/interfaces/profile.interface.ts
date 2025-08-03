import { Image } from '../../shared/interfaces/image.interface';

/**
 * Job bullet interface for experience items
 */
export interface JobBullet {
  id: number;
  text: string;
}

/**
 * Experience interface for profile experiences
 */
export interface Experience {
  id: number;
  documentId: string;
  title: string;
  companyName: string;
  startDate: string;
  endDate: string | null;
  location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  jobBullets: JobBullet[];
  companyImage?: Image;
}

/**
 * Skill item interface
 */
export interface SkillItem {
  id: number;
  text: string;
}

/**
 * Skill category interface
 */
export interface SkillCategory {
  id: number;
  documentId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  skills: SkillItem[];
}

/**
 * Education interface for profile education
 */
export interface Education {
  id: number;
  documentId: string;
  instituteName: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Project interface for profile projects
 */
export interface Project {
  id: number;
  documentId: string;
  name: string;
  domain: string;
  description: string;
  contribution: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  technologies: string;
  logoImage?: Image;
}

/**
 * Testimonial interface for profile testimonials
 */
export interface Testimonial {
  id: number;
  documentId: string;
  name: string;
  title: string;
  url: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
}

/**
 * Profile model matching the Strapi /profile single entry response
 */
export interface Profile {
  id: number;
  documentId: string;
  title: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  summary: string;
  experiences: Experience[];
  skills: SkillCategory[];
  educations: Education[];
  testimonials: Testimonial[];
  projects: Project[];
  profilePic?: Image;
}

/**
 * Strapi single entry response wrapper
 */
export interface ProfileResponse {
  data: Profile;
  meta: any;
} 