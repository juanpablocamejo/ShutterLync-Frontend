import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PreviewItem } from 'src/shared/models/previewItem';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-preview-grid-item',
  templateUrl: './preview-grid-item.component.html',
  styleUrls: ['./preview-grid-item.component.scss']
})
export class PreviewGridItemComponent {
  @Input() item: PreviewItem;
  @Output() change = new EventEmitter<boolean>();
  public imgUrl = 'assets/blank.png';

  public get selected(): boolean {
    return this.item.selectedByClient;
  }

  public set selected(value: boolean) {
    this.item.selectedByClient = value;
    this.change.emit(value);
  }


  onIntersection(event) {
    if (event.visible) {
      this.imgUrl = this.item.fileData ? `${environment.apiUrl}/files/${this.item.fileData}` : '';
    }
  }

}
