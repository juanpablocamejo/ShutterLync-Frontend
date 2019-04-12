import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl(_id: string): string { return `${environment.apiUrl}/projects/${_id}`; }

  constructor(private http: HttpClient) { }

  getProject(_id: string): Observable<Project> {
    return this.http.get<Project>(this.projectUrl(_id));
  }

  saveOrder(_id: string, items: string[]): Observable<any> {
    console.log(_id, items);
    return this.http.post(this.projectUrl(_id) + '/orders', { _id, items });
  }

}
