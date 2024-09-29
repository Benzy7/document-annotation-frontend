import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = environment.backendEndpoint + '/annotations/tags';

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/`);
  }

  addTag(doc: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiUrl}/`, doc);
  }

  updateTag(id: number, doc: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/${id}/`, doc);
  }

  deletetag(id: number): Observable<Tag> {
    return this.http.delete<Tag>(`${this.apiUrl}/${id}/`);
  }
}
