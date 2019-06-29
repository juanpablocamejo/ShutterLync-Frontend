import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Project } from 'src/shared/models/Project';
import { OrderState } from 'src/shared/models/enums/OrderState';
import { PreviewItem } from 'src/shared/models/PreviewItem';
import { UploadInput } from 'ngx-uploader';
import { OrderItem } from 'src/shared/models/OrderItem';
import { ProjectState } from 'src/shared/models/enums/ProjectState';
import { UploadFile } from 'ngx-file-drop';

interface SelectionDict { [id: string]: { selected: boolean }; }
interface TableItem { nro: number; fileName: string; done: boolean; }
type GridItem = PreviewItem & OrderItem;

@Component({
  selector: 'app-project-orders',
  templateUrl: './project-orders.component.html',
  styleUrls: ['./project-orders.component.scss']
})
export class ProjectOrdersComponent implements OnInit {

  constructor(
    public dialog: MatDialog) {
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
  @Input() project: Project;
  editable: boolean;
  public orderState: OrderState;
  public loaded = false;
  previewItems: GridItem[] = [];
  displayedColumns: string[] = ['nro', 'item'];
  doneItems = 0;

  ngOnInit(): void {
    const getPrevItm = (itm: OrderItem) => this.project.getItem(itm.previewItemId);
    this.editable = this.project.orderLoaded;
    this.previewItems = this.project.orderItems.map(itm => ({ ...itm, ...getPrevItm(itm) } as GridItem));
    this.doneItems = this.calcProgress();
  }

  get progress() {
    return Math.round(this.doneItems * 100 / this.previewItems.length);
  }
  calcProgress() {
    return this.previewItems.filter(itm => itm.done).length;
  }

  getItemByName(name: string) {
    return this.previewItems.find(itm => itm.fileName === name);
  }

  toggleItem(item: GridItem) {
    const newValue = !item.done;
    this.project.markItemAsDone(item.id, newValue);
    item.done = newValue;
    this.doneItems += newValue ? 1 : -1;
  }

  markItemAsDone(file: any) {
    const item = this.getItemByName(file.name);
    console.log(file.name, item);
    if (!item || item.done) { return; }

    this.project.markItemAsDone(item.id, true);
    this.doneItems += 1;
    item.done = true;

  }


}
