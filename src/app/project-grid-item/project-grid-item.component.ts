import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/shared/models/Project';

@Component({
  selector: 'app-project-grid-item',
  templateUrl: './project-grid-item.component.html',
  styleUrls: ['./project-grid-item.component.scss']
})
export class ProjectGridItemComponent implements OnInit {
  @Input() project: Project;
  constructor() { }

  ngOnInit() {
  }

}
