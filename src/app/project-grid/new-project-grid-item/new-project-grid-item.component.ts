import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project-grid-item',
  templateUrl: './new-project-grid-item.component.html',
  styleUrls: ['./new-project-grid-item.component.scss']
})
export class NewProjectGridItemComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  newProject() {
    this.router.navigateByUrl('/projects/new');
  }

}
