import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { StrapiClientService } from './strapi-client.service';

// Job bullet interface for experience items
export interface JobBullet {
  id: number;
  text: string;
}

// Experience interface for profile experiences
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
  companyImage?: {
    id: number;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Skill item interface
export interface SkillItem {
  id: number;
  text: string;
}

// Skill category interface
export interface SkillCategory {
  id: number;
  documentId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  skills: SkillItem[];
}

// Education interface for profile education
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

// Testimonial image interface
export interface TestimonialImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Testimonial interface for profile testimonials
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
  image: TestimonialImage;
}

// Profile model matching the Strapi /profile single entry response
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
  profilePic?: {
    id: number;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
  };
}

// Strapi single entry response wrapper
export interface ProfileResponse {
  data: Profile;
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private strapi: StrapiClientService) {}

  /**
   * Fetch the profile from Strapi /profile endpoint with populated media fields
   * @returns Observable<ProfileResponse>
   */
  getProfile(): Observable<ProfileResponse> {
    // Create params to populate the profilePic field and experiences with their jobBullets and companyImage
    // Using Strapi's nested populate syntax for relations
    const params = new HttpParams()
      .set('populate[profilePic]', 'true')
      .set('populate[experiences][populate][jobBullets]', 'true')
      .set('populate[experiences][populate][companyImage]', 'true')
      .set('populate[skills][populate]', 'skills')
      .set('populate[educations]', 'true')
      .set('populate[testimonials][populate]', 'image');
    
    return this.strapi.get<ProfileResponse>('/profile', params);
  }
} 