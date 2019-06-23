import { Component, OnInit, Input, Directive } from '@angular/core';
import { PreviewItem } from 'src/shared/models/previewItem';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loader-preview-item',
  templateUrl: './loader-preview-item.component.html',
  styleUrls: ['./loader-preview-item.component.scss']
})
export class LoaderPreviewItemComponent implements OnInit {
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
