import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { ProjectService } from 'src/shared/services/project.service';
import { Project } from 'src/shared/models/Project';
import { UserRole } from 'src/shared/models/enums/UserRole';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
  providers: [DatePipe]
})
export class ProjectViewComponent implements OnInit {
  project: Project;
  public userRole: UserRole;
  public projectSection: string;
  public UserRole = UserRole;

  constructor(private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private dialog: MatDialog,
              private datePipe: DatePipe) {
    this.userRole = auth.currentUserValue.role;
    route.data.subscribe(
      ({ section }) => { this.projectSection = section; }
    );
  }

  public menuItems = [
    { section: 'upload', title: 'Carga de Imagenes' },
    { section: 'orders', title: 'Pedidos' }
  ];

  get title() {
    return `${this.datePipe.transform(this.project.date, 'dd/MM/yyyy')} - ${this.project.title}`;
  }

  get shortTitle() {
    const len = this.project.title.length;
    const maxLen = 33;
    const tooLarge = len > maxLen;
    return tooLarge ? `${this.project.title.substr(0, maxLen - 3)}...` : this.project.title;
  }

  get section() {
    return this.route.snapshot.data.section;
  }

  changeSection(section: string) {
    this.router.navigateByUrl(`/projects/${this.route.snapshot.params.projectId}/${section}`);
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {});
    dialogRef.beforeClose().subscribe(() => {
      this.router.navigateByUrl('/projects');
    });
  }

  confirmPreview() {
    this.projectService.confirmPreview(this.project.id)
      .subscribe(this.openDialog);
  }

  completeOrder() {
    this.projectService.completeOrder(this.project.id, this.project.order)
      .subscribe(this.openDialog);
  }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params.projectId)
      .subscribe(proj => { this.project = proj; });
  }

}
