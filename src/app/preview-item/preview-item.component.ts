import { Component, OnInit, Input } from '@angular/core';
import { PreviewItem } from 'src/shared/models/PreviewItem';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview-item',
  templateUrl: './preview-item.component.html',
  styleUrls: ['./preview-item.component.scss']
})
export class PreviewItemComponent implements OnInit {
  @Input() item: PreviewItem;
  visible: boolean;
  loaded: boolean;
  imgUrl: string;
  constructor() { }

  ngOnInit() {
    this.imgUrl = `${environment.apiUrl}/files/${this.item.fileData}`;
  }

  onIntersection(event) {
    if (event.visible) {
      this.visible = true;
    }
  }

  onImgLoad() {
    this.loaded = true;
  }
}
