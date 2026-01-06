import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type DocumentStatus = 'Draft' | 'Sent' | 'PartiallySigned' | 'Completed' | 'Cancelled';

export interface Signatory {
  id?: string;
  name: string;
  email: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  content: string;
  status: number;
  createdAt: string;
  updatedAt?: string | null;
  completedAt?: string | null;
  signatories: Signatory[];
}

export interface DocumentCreateDto {
  title: string;
  content: string;
  type: number;
  signatories: { name: string; email: string }[];
}

export interface DocumentUpdateDto {
  title: string;
  content: string;
  status: number;
}

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/Documents`;

  getMy(): Observable<DocumentItem[]> {
    return this.http.get<DocumentItem[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<DocumentItem> {
    return this.http.get<DocumentItem>(`${this.baseUrl}/${id}`);
  }

  create(payload: DocumentCreateDto): Observable<DocumentItem> {
    return this.http.post<DocumentItem>(`${this.baseUrl}`, payload);
  }

  update(id: string, payload: DocumentUpdateDto): Observable<DocumentItem> {
    return this.http.put<DocumentItem>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
