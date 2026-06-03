import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { AuthApiService } from '../auth/auth-api.service';
import {
  TopicCatalogResponse,
  TopicCategoryResponse,
  TopicResponse,
} from './topics.models';

@Injectable({ providedIn: 'root' })
export class TopicsApiService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly authApi = inject(AuthApiService);
  private readonly http = inject(HttpClient);

  /**
   * Fetches the topic catalog and categories from the backend API.
   * @returns {Observable<TopicCatalogResponse>}
   */
  public getCatalog(): Observable<TopicCatalogResponse> {
    return forkJoin({
      categories: this.getCategories(),
      topics: this.getTopics(),
    });
  }

  /**
   * Fetches all topic categories from the backend API.
   * @returns {Observable<TopicCategoryResponse[]>}
   */
  public getCategories(): Observable<TopicCategoryResponse[]> {
    return this.http.get<TopicCategoryResponse[]>(
      `${this.apiUrl}/topics/categories`,
      { headers: this.getAuthHeaders() },
    );
  }

  /**
   * Fetches all topics from the backend API.
   * @returns {Observable<TopicResponse[]>}
   */
  public getTopics(): Observable<TopicResponse[]> {
    return this.http.get<TopicResponse[]>(`${this.apiUrl}/topics`, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Builds authorization headers for protected topic endpoints.
   * @returns {HttpHeaders}
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authApi.getAuthToken();

    if (token === null) {
      return new HttpHeaders();
    }

    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
