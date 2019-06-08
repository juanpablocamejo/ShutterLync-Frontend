import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { ProjectState } from '../models/enums/ProjectState';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl(projectId?: string): string { return `${environment.apiUrl}/projects` + (projectId ? `/${projectId}` : ''); }

  constructor(private http: HttpClient) { }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(this.projectUrl(id));
  }

  getProjects() {
    return this.http.get<Project[]>(this.projectUrl());
  }

  saveOrder(projectId: string, order: Order): Observable<any> {
    return this.http.post(this.projectUrl(projectId) + '/orders', { ...order });
  }

  confirmOrder(projectId: string, order: Order): Observable<any> {
    order.confirm();
    return this.http.post(this.projectUrl(projectId) + '/orders', { ...order });
  }
  completeOrder(projectId: string, order: Order): Observable<any> {
    order.complete();
    return this.http.post(this.projectUrl(projectId) + '/orders', { ...order });
  }

  confirmPreview(projectId: string): Observable<any> {
    return this.http.patch(this.projectUrl(projectId) + '/', { state: ProjectState.PREVIEW_LOADED });
  }

  createProject(project: Project) {
    return this.http.post(this.projectUrl(), project);
  }

}
