import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreviewItemService {
  private url(itemId?: string): string { return `${environment.apiUrl}/previewItems${(itemId ? `/${itemId}` : '')}`; }


  constructor(private http: HttpClient) { }


  delete(itemId: string, projectId: string) {
    return this.http.delete(this.url(itemId), { params: { projectId } });
  }
}
