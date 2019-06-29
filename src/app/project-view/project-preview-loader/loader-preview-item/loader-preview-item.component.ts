import { Component, OnInit, Input, Directive, Output, EventEmitter } from '@angular/core';
import { PreviewItem } from 'src/shared/models/PreviewItem';
import { environment } from 'src/environments/environment';
import { PreviewItemService } from 'src/shared/services/preview-item.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-loader-preview-item',
  templateUrl: './loader-preview-item.component.html',
  styleUrls: ['./loader-preview-item.component.scss']
})
export class LoaderPreviewItemComponent implements OnInit {
  @Input() item: PreviewItem;
  @Input() editable: boolean;
  visible: boolean;
  loaded: boolean;
  imgUrl: string;
  projectId: string;
  @Output() deleted = new EventEmitter<string>();
  constructor(
    private previewItemService: PreviewItemService,
    private dialog: MatDialog,
    route: ActivatedRoute
  ) {
    route.params.subscribe(({ projectId }) => this.projectId = projectId);
  }

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

  confirmDelete(title: string, text?: string) {
    const data = { title, text, color: 'warn', action: 'Eliminar' };
    const ref = this.dialog.open(ConfirmationDialogComponent, { data });
    return ref.beforeClose();
  }

  deleteSuccess() {
    this.deleted.emit(this.item.id);
  }

  deleteItem() {
    const title = '¿Desea eliminar el item de la muestra?';
    this.confirmDelete(title)
      .subscribe(res => { if (res) { this.doDelete(); } });
  }

  doDelete() {
    this.previewItemService.delete(this.item.id, this.projectId)
      .subscribe(this.deleteSuccess.bind(this));
  }
}
