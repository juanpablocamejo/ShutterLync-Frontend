import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/shared/models/Project';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { OrderState } from 'src/shared/models/enums/OrderState';
import { PreviewItem } from 'src/shared/models/previewItem';

interface SelectionDict { [id: string]: { selected: boolean }; }
interface TableItem { nro: number; fileName: string; cost: number; }

@Component({
  selector: 'app-project-orders',
  templateUrl: './project-orders.component.html',
  styleUrls: ['./project-orders.component.scss']
})


export class ProjectOrdersComponent implements OnInit {
  @Input() project: Project;
  public selection: SelectionDict = {};
  public orderState: OrderState;
  public loaded = false;
  orderItems: TableItem[] = [];
  displayedColumns: string[] = ['nro', 'item'];

  constructor(
    public dialog: MatDialog) {
  }

  ngOnInit() {
    const qty = this.project.quantity;
    const unitCost = this.project.aditionalItemPrice;
    if (this.project.order) {
      this.orderItems = this.project.previewItems
        .filter(itm => this.project.selected(itm.id))
        .map((itm, idx) => ({ nro: idx + 1, fileName: itm.fileName, cost: ((idx + 1) > qty) ? unitCost : 0 }));
    }
  }

  get aditionalQuantity() {
    return this.project.aditionalQuantity;
  }
  get totalCost() {
    return this.project.totalCost;
  }
  get aditionalCost() {
    return this.project.aditionalPrice;
  }

}
