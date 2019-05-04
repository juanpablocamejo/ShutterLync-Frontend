import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl(projectId?: string): string { return `${environment.apiUrl}/projects` + (projectId ? `/${projectId}` : ''); }

  constructor(private http: HttpClient) { }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(this.projectUrl(id));
  }

  getProjectByClient(clientId: string): Observable<Project> {
    return this.http.get<Project>(this.projectUrl(), { params: { clientId } });
  }

  saveOrder(projectId: string, order: Order): Observable<any> {
    return this.http.post(this.projectUrl(projectId) + '/orders', { order });
  }

  createProject(project: Project) {
    return this.http.post(this.projectUrl(), project);
  }

}
