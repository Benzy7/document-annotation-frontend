import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Document } from '../models/document';
import { Annotation } from '../models/annotation';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = environment.backendEndpoint + '/annotations';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/documents/`);
  }

  addDocument(doc: Document): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/documents/`, doc);
  }

  updateDocument(id: number, doc: Document): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/documents/${id}/`, doc);
  }

  deleteDocument(id: number): Observable<Document> {
    return this.http.delete<Document>(`${this.apiUrl}/documents/${id}/`);
  }

  addDocumentAnnotation(annotation: Annotation): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/add-annotation/`, annotation);
  }
}
