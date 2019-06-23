import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PreviewItem } from 'src/shared/models/PreviewItem';
import { environment } from 'src/environments/environment';
import { MatCheckboxChange } from '@angular/material';


@Component({
  selector: 'app-preview-grid-item',
  templateUrl: './preview-grid-item.component.html',
  styleUrls: ['./preview-grid-item.component.scss']
})
export class PreviewGridItemComponent implements OnInit {
  variable = false;
  visible = false;
  loaded = false;
  @Input() editable: boolean;
  @Input() item: PreviewItem;
  @Input() selected: boolean;

  @Output() change = new EventEmitter<boolean>();
  public imgUrl = '/assets/blank2.jpg';

  ngOnInit(): void {
    this.imgUrl = `${environment.apiUrl}/files/${this.item.fileData}`;
  }


  onIntersection(event) {
    if (event.visible) {
      this.visible = event.visible;
    }
  }

  onImgLoad() {
    this.loaded = true;
  }

  onSelectedChange(change: MatCheckboxChange) {
    this.selected = change.checked;
    this.change.emit(change.checked);
  }
}
