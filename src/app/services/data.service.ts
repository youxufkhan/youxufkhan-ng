import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private baseHttpService: BaseHttpService) { }

  /**
   * Generic method to fetch any data from a custom endpoint
   * @param endpoint - The API endpoint
   * @returns Observable of any data type
   */
  getData<T>(endpoint: string): Observable<T> {
    return this.baseHttpService.get<T>(endpoint);
  }
} 