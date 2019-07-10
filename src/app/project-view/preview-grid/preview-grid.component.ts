import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogComponent } from '../../dialogs/success-dialog/success-dialog.component';
import { ProjectService } from 'src/shared/services/project.service';
import { Project } from 'src/shared/models/Project';
import { OrderStates } from 'src/shared/models/enums/OrderStates';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-preview-grid',
  templateUrl: './preview-grid.component.html',
  styleUrls: ['./preview-grid.component.scss']
})
export class PreviewGridComponent implements OnInit {
  private project: Project;
  public cols = 4;
  public loaded = false;
  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute) {
  }

  get order() { return this.project.order; }
  get orderState() { return this.order.state; }
  selected(id: string) { return this.project.selected(id); }
  get selectedItems() { return this.project.selectedItems; }
  get completedSelection() { return this.project.completedSelection; }
  get completedQuantity() { return this.project.completedQuantity; }
  get aditionalQuantity() { return this.project.aditionalQuantity; }
  get aditionalPrice() { return this.project.aditionalPrice; }

  onSelectionChange(id: string, selected: any) {
    if (selected) { this.order.add(id); } else { this.order.remove(id); }
  }

  confirmDialog = (title: string, text?: string) => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title, text, action: 'Aceptar' } });
    return dialogRef.beforeClose();
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {});
    dialogRef.beforeClose().subscribe(() => {
      this.router.navigateByUrl('projects');
    });
  }

  get hasMessage() {
    return !this.pending;
  }
  get confirmed() {
    return this.order.state === OrderStates.CONFIRMED;
  }
  get completed() {
    return this.order.state === OrderStates.COMPLETED;
  }
  get pending() {
    return this.order.state === OrderStates.PENDING;
  }
  get delivered() {
    return this.order.state === OrderStates.DELIVERED;
  }

  saveOrder() {
    this.projectService.saveOrder(this.project.id, this.order)
      .subscribe(this.openDialog);
  }

  confirmOrder() {
    this.confirmDialog('¿Desea confirmar el pedido?', `Costo adicional: $ ${this.aditionalPrice}`).subscribe(
      (value) => {
        if (value) {
          this.projectService.confirmOrder(this.project.id, this.order)
            .subscribe(() => { this.openDialog(); });
        }
      }
    );

  }

  ngOnInit() {
    const { projectId } = this.route.snapshot.params;
    this.projectService.getProject(projectId).subscribe(
      (project: Project) => {
        this.project = project;
        this.loaded = true;
      }
    );
  }
}
