import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/shared/models/Project';
import { ProjectStates } from 'src/shared/models/enums/ProjectStates';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { UserRole } from 'src/shared/models/enums/UserRole';
import { ProjectStateService } from 'src/shared/services/project-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-grid-item',
  templateUrl: './project-grid-item.component.html',
  styleUrls: ['./project-grid-item.component.scss'],
})
export class ProjectGridItemComponent implements OnInit {
  @Input() project: Project;
  private role: UserRole;
  stateLabel: Observable<string>;
  ProjectState = ProjectStates;

  get isClient() {
    return this.role === UserRole.CLIENT;
  }

  constructor(private auth: AuthenticationService,
              private router: Router,
              private states: ProjectStateService) {
    this.role = auth.currentUserValue.role;
  }

  clientAction() {
    if (this.project.state === ProjectStates.CREATED) { return; }
    this.router.navigateByUrl(`/projects/${this.project.id}/preview`);
  }
  studioAction() {
    const path = this.project.created ? 'upload' : 'orders';
    this.router.navigateByUrl(`/projects/${this.project.id}/${path}`);
  }
  gotoProject() {
    const isClient = this.role === UserRole.CLIENT;
    if (isClient) { this.clientAction(); } else { this.studioAction(); }
  }

  ngOnInit() {
    this.stateLabel = this.states.getLabel(this.project.state);
  }

}
