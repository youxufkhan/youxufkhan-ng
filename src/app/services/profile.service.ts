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
    // Create params to populate the profilePic field and experiences with their jobBullets
    // Using Strapi's nested populate syntax for relations
    const params = new HttpParams()
      .set('populate[profilePic]', 'true')
      .set('populate[experiences][populate]', 'jobBullets');
    
    return this.strapi.get<ProfileResponse>('/profile', params);
  }
} 