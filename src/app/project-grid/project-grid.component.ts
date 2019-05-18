import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { calcGridColumns } from 'src/shared/utils/utils';
import { Router } from '@angular/router';
import { ProjectService } from 'src/shared/services/project.service';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss']
})
export class ProjectGridComponent implements OnInit {
  public cols = 4;
  constructor(
    private mediaObserver: MediaObserver,
    private router: Router,
    private projectService: ProjectService

  ) {
    this.mediaObserver.asObservable()
      .subscribe((change: MediaChange[]) => {
        this.cols = this.getCols();
      });
  }

  getCols(): number {
    return calcGridColumns(this.mediaObserver, { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 });
  }
  ngOnInit() {
    // this.projectService.getProjectsByOwner()
  }
  newProject() {
    this.router.navigateByUrl('/projects/new');
  }
}
