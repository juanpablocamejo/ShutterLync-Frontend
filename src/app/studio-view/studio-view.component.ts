import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/shared/services/project.service';
import { Project } from 'src/shared/models/Project';

@Component({
  selector: 'app-studio-view',
  templateUrl: './studio-view.component.html',
  styleUrls: ['./studio-view.component.scss']
})
export class StudioViewComponent {
  project: Project;
  constructor(private route: ActivatedRoute, private projectService: ProjectService) {

  }

}
