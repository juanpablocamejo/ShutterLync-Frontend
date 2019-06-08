import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { UserRole } from 'src/shared/models/enums/UserRole';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/shared/services/project.service';
import { Project } from 'src/shared/models/Project';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';
import { ProjectState } from 'src/shared/models/enums/ProjectState';
import { Order } from 'src/shared/models/order';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  project: Project;
  public userRole: UserRole;
  public projectSection: string;
  public title: string;
  public UserRole = UserRole;

  constructor(private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private dialog: MatDialog) {
    this.userRole = auth.currentUserValue.role;
    route.data.subscribe(
      ({ section, title }) => { this.projectSection = section; this.title = title; }
    );
  }

  public menuItems = [
    { section: 'upload', title: 'Carga de Imagenes' },
    { section: 'orders', title: 'Pedidos' }
  ];
  get section() {
    return this.route.snapshot.data.section;
  }
  get showConfirmPreview() {
    return this.section === 'upload' && this.project.state === ProjectState.CREATED;
  }

  get showCompleteOrder() {
    return this.section === 'orders' && this.project.state === ProjectState.PENDING;
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
    this.projectService.completeOrder(this.project.id, new Order(this.project.order))
      .subscribe(this.openDialog);
  }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params.projectId)
      .subscribe(proj => { this.project = proj; });
  }

}
