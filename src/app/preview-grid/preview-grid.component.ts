import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Project } from 'src/shared/models/project';
import { ProjectService } from 'src/shared/services/project.service';
import { PreviewItem } from 'src/shared/models/previewItem';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Order } from 'src/shared/models/order';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';



@Component({
  selector: 'app-preview-grid',
  templateUrl: './preview-grid.component.html',
  styleUrls: ['./preview-grid.component.scss']
})
export class PreviewGridComponent {

  @Input() project: Project;
  public cols = 4;
  public selectedItems = 0;

  constructor(private projectService: ProjectService, private mediaObserver: MediaObserver, public dialog: MatDialog) {

    this.mediaObserver.asObservable()
      .subscribe((change: MediaChange[]) => {
        this.cols = this.getCols();
      });
  }

  onSelectionChange(previewItem: PreviewItem, selected: any) {
    this.selectedItems += event ? 1 : -1;
  }

  openDialog = () => {
    const cfg = new MatDialogConfig();
    const dialogRef = this.dialog.open(SuccessDialogComponent, {});
    dialogRef.beforeClose().subscribe(() => {
      this.project.order.confirmed = true;
    });
  }


  saveOrder() {
    const orderItems: PreviewItem[] = this.project.previewItems.filter((itm => itm.selectedByClient));
    const order = new Order();
    order.confirmed = true;
    order.selectedItems = orderItems.map(itm => itm._id);
    console.log(this.project._id, order);
    this.projectService.saveOrder(this.project._id, order)
      .subscribe(this.openDialog);
  }

  getCols(): number {
    const grid = new Map([
      ['xs', 1],
      ['sm', 2],
      ['md', 3],
      ['lg', 4],
      ['xl', 4]
    ]);
    let res: number;
    grid.forEach((nCols, mqAlias) => {
      if (this.mediaObserver.isActive(mqAlias)) {
        res = nCols;
      }
    });
    return res;
  }

}
