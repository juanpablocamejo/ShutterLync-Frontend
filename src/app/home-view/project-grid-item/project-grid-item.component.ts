import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../shared/models/Project';
import { ProjectState } from '../../../shared/models/enums/ProjectState';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { UserRole } from '../../../shared/models/enums/UserRole';

@Component({
  selector: 'app-project-grid-item',
  templateUrl: './project-grid-item.component.html',
  styleUrls: ['./project-grid-item.component.scss']
})
export class ProjectGridItemComponent implements OnInit {
  variable = false;
  @Input() project: Project;
  private role: UserRole;

  ProjectState = ProjectState;

  get isClient() {
    return this.role === UserRole.CLIENT;
  }

  constructor(private auth: AuthenticationService, private router: Router) {
    this.role = auth.currentUserValue.role;
  }

  clientAction() {
    if (this.project.state === ProjectState.CREATED) { return; }
    this.router.navigateByUrl(`/projects/${this.project.id}/preview`);
  }
  studioAction() {
    const path = this.project.state === ProjectState.CREATED ? 'upload' : 'orders';
    this.router.navigateByUrl(`/projects/${this.project.id}/${path}`);
  }
  gotoProject() {
    const isClient = this.role === UserRole.CLIENT;
    if (isClient) { this.clientAction(); } else { this.studioAction(); }
  }

  ngOnInit() {
  }

}
