import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrapiClientService {
  /**
   * The base URL of the Strapi backend from environment configuration.
   */
  private baseUrl = `${environment.strapiBaseUrl}/api`;

  constructor(private http: HttpClient) {}

  /**
   * Set the base URL for the Strapi backend.
   * @param url The new base URL
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Get the current base URL.
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Perform a GET request to a Strapi endpoint.
   * @param endpoint The Strapi API endpoint (e.g., '/articles')
   * @param params Optional query parameters
   * @param headers Optional HTTP headers
   */
  get<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      params,
      headers
    };
    return this.http.get<T>(url, options).pipe(
      catchError((error) => {
        // You can extend this to handle errors more gracefully
        console.error('StrapiClientService GET error:', error);
        return throwError(() => error);
      })
    );
  }
} 