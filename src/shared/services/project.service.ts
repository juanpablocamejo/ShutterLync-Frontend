import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { ProjectState } from '../models/enums/ProjectState';
import { ProjectFilter } from './ProjectFilter';
import { map } from 'rxjs/operators';
import { BaseObject } from '../models/BaseObject';
import { PaginationOptions } from './PaginationOptions';

interface PaginatedResult<T> {
  totalCount: number;
  results: T[];
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl(projectId?: string): string { return `${environment.apiUrl}/projects` + (projectId ? `/${projectId}` : ''); }

  constructor(private http: HttpClient) { }

  getProject(id: string): Observable<Project> {
    return this.mapToEntity(Project, this.http.get<Project>(this.projectUrl(id)));
  }

  getProjects() {
    const { DELIVERED, ...PendingStates } = ProjectState;
    const cmpByState = (a: Project, b: Project): -1 | 0 | 1 => (a.state > b.state) ? 1 : (a.state < b.state ? -1 : 0);
    return this.mapArrayToEntities(Project, this.http.get<Project[]>(this.projectUrl(), {
      params: {
        states: Object.values(PendingStates).join(',')
      }
    })).pipe(map(projects => projects.sort(cmpByState)));
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

  search(filter: ProjectFilter, pagination: PaginationOptions) {
    return this.mapPaginatedArrayToEntities(Project,
      this.http.get<PaginatedResult<Project>>(this.projectUrl(), {
        params: { ...filter.toHttpParams(), ...pagination }
      }));
  }

  mapToEntity<T extends BaseObject>(type: new (fields: Partial<T>) => T, res: Observable<T>) {
    return res.pipe(map(elem => new type(elem)));
  }
  mapArrayToEntities<T extends BaseObject>(type: new (fields: Partial<T>) => T, elems: Observable<T[]>) {
    return elems.pipe(map(res => res.map(elem => new type(elem))));
  }
  mapPaginatedArrayToEntities<T extends BaseObject>(type: new (fields: Partial<T>) => T, elems: Observable<PaginatedResult<T>>) {
    return elems.pipe(map(res => ({ ...res, results: res.results.map(elem => new type(elem)) })));
  }
}

