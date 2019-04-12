import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/shared/services/project.service';
import { environment } from 'src/environments/environment';
import { Project } from 'src/shared/models/project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shutterlync';
  private currentProject: Project;

  constructor(private projectService: ProjectService) { }
  ngOnInit() {
    this.projectService.getProject(environment.testProjectId).subscribe(
      (project) => {
        this.currentProject = project;
      }
    );
  }
}
