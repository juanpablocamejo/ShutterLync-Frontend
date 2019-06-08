import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/shared/models/Project';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { OrderState } from 'src/shared/models/enums/OrderState';
import { Order } from 'src/shared/models/order';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';
import { ProjectService } from 'src/shared/services/project.service';

interface SelectionDict { [id: string]: { selected: boolean }; }

@Component({
  selector: 'app-preview-grid',
  templateUrl: './preview-grid.component.html',
  styleUrls: ['./preview-grid.component.scss']
})


export class PreviewGridComponent implements OnInit {
  private project: Project;
  public cols = 4;
  // public selectedItems = 0;
  public selection: SelectionDict = {};
  public orderState: OrderState;
  public loaded = false;
  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    private route: ActivatedRoute) {

  }
  get selectedItems() {
    return Object.values(this.selection).filter(itm => itm.selected).length || 0;
  }
  selected(id: string) {
    return this.selection[id].selected;
  }
  get completedSelection() {
    const [sel, total] = [this.selectedItems, this.project.quantity];
    return sel >= total ? 100 : Math.round((sel * 100) / total);
  }
  get completedQuantity() {
    const [sel, total] = [this.selectedItems, this.project.quantity];
    return sel >= total ? total : sel;
  }
  get aditionalQuantity() {
    const [sel, total] = [this.selectedItems, this.project.quantity];
    return sel > total ? sel - total : 0;
  }
  onSelectionChange(id: string, selected: any) {
    this.selection[id].selected = selected;
  }

  get aditionalPrice() {
    return this.project.aditionalItemPrice * (this.selectedItems - this.project.quantity);
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {});
    dialogRef.beforeClose().subscribe(() => {
    });
  }

  get confirmed() {
    return this.orderState === OrderState.CONFIRMED;
  }
  get pending() {
    return this.orderState === OrderState.PENDING;
  }

  getOrder() {
    const items = Object.keys(this.selection).filter(id => this.selection[id].selected);
    return new Order({ orderItems: items });
  }
  saveOrder() {
    this.projectService.saveOrder(this.project.id, this.getOrder())
      .subscribe(this.openDialog);
  }

  confirmOrder() {
    this.projectService.confirmOrder(this.project.id, this.getOrder())
      .subscribe(() => { this.orderState = OrderState.CONFIRMED; this.openDialog(); });
  }

  loadOrder(project: Project) {
    project.previewItems.forEach(itm => { this.selection[itm.id] = { selected: false }; });
    project.order.orderItems.forEach(id => { this.selection[id] = { selected: true }; });
    this.loaded = true;
    this.orderState = project.order.state;
  }

  ngOnInit() {
    const { projectId } = this.route.snapshot.params;
    this.projectService.getProject(projectId).subscribe(
      (project: Project) => {
        this.project = project;
        if (!this.project.order) { this.project.order = new Order({ orderItems: [], state: OrderState.PENDING }); }
        this.loadOrder(this.project);
      }
    );
  }
}
