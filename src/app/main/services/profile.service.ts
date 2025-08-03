import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { StrapiClientService } from './strapi-client.service';
import { ProfileResponse } from '../interfaces';

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
      .set('populate[testimonials][populate]', 'image')
      .set('populate[projects][populate]', 'logoImage');
    
    return this.strapi.get<ProfileResponse>('/profile', params);
  }
} 