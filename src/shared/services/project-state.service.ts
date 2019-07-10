import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectState } from '../models/ProjectState';
import { environment } from 'src/environments/environment';
import { map, filter } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ProjectStates } from '../models/enums/ProjectStates';
import { ProjectStateMap } from './ProjectStateMap';

@Injectable({
  providedIn: 'root'
})
export class ProjectStateService {
  states: ProjectState[] = null;
  statesMap: ProjectStateMap = null;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.states ? of(this.states) : this.http.get<ProjectState[]>(environment.apiUrl + '/projectStates', {})
      .pipe(
        map((states) => {
          this.states = states;
          this.statesMap = states.reduce(
            (obj: ProjectStateMap, elem: ProjectState) => ({ [elem.id]: elem, ...obj }),
            {} as ProjectStateMap);
          return this.states;
        })
      );
  }

  private getLabelValue(state: ProjectStates) {
    return this.statesMap[state].label;
  }

  getLabel(state: ProjectStates): Observable<string> {
    return this.states ? of(this.getLabelValue(state)) : this.getAll().pipe(map(() => this.getLabelValue(state)));
  }

  getPendingStates() {
    return this.getAll().pipe(
      map(
        (states: ProjectState[]) => states.filter(state => state.id !== (ProjectStates.DELIVERED as number))
      )
    );
  }

}
