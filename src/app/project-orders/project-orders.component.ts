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
    const filterFn = (itm: PreviewItem) => this.project.order.orderItems.includes(itm.id);
    if (this.project.order) {
      this.orderItems = this.project.previewItems
        .filter(itm => filterFn(itm))
        .map((itm, idx) => ({ nro: idx + 1, fileName: itm.fileName, cost: ((idx + 1) > qty) ? unitCost : 0 }));
    }
  }

  aditionalQuantity() {
    const [sel, total] = [this.orderItems.length, this.project.quantity];
    return sel > total ? (sel - total) : total;
  }
  totalCost() {
    return this.project.quotation + this.aditionalCost();
  }
  aditionalCost() {
    return this.aditionalQuantity() * this.project.aditionalItemPrice;
  }

}
