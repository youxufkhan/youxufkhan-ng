import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  private baseUrl = 'https://jsonplaceholder.typicode.com'; // Update this with your actual backend URL

  constructor(private http: HttpClient) { }

  /**
   * GET request to fetch data from the backend
   * @param endpoint - The API endpoint (e.g., '/users', '/posts')
   * @param params - Optional query parameters
   * @param headers - Optional custom headers
   * @returns Observable of the response data
   */
  get<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      params: params,
      headers: headers
    };

    return this.http.get<T>(url, options);
  }

  /**
   * Set the base URL for API calls
   * @param url - The base URL for the API
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Get the current base URL
   * @returns The current base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
} 