import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/shared/services/project.service';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { UserRole } from 'src/shared/models/enums/UserRole';
import { Project } from 'src/shared/models/Project';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss']
})
export class ProjectGridComponent implements OnInit {
  public cols = 4;
  public projects: Project[] = [];
  isClient: boolean;
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private auth: AuthenticationService
  ) { }
  ngOnInit() {
    const user = this.auth.currentUserValue;
    this.isClient = user.role === UserRole.CLIENT;
    this.projectService.getProjects()
      .subscribe((projects) => { this.projects = projects; });
  }

}
