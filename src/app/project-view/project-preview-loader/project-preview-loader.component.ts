import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { UploadInput, UploadOutput, humanizeBytes, UploaderOptions, UploadFile } from 'ngx-uploader';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/shared/models/Project';
import { ProjectService } from 'src/shared/services/project.service';
import { PreviewItem } from 'src/shared/models/previewItem';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { calcGridColumns } from 'src/shared/utils/utils';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { ProjectState } from 'src/shared/models/enums/ProjectState';


enum UploaderEvent {
  REJECTED = 'rejected',
  ALL_ADDED_TO_QUEUE = 'allAddedToQueue',
  ADDED_TO_QUEUE = 'addedToQueue',
  DRAG_OVER = 'dragOver',
  DROP = 'drop',
  DONE = 'done',
  UPLOADING = 'uploading',
  REMOVED = 'removed',
  DRAG_OUT = 'dragOut'
}
enum UploadInputEvent {
  UPLOAD_ALL = 'uploadAll',
  UPLOAD_FILE = 'uploadFile',
  CANCEL = 'cancel',
  CANCEL_ALL = 'cancelAll',
  REMOVE = 'remove',
  REMOVE_ALL = 'removeAll'
}

@Component({
  selector: 'app-project-preview-loader',
  templateUrl: './project-preview-loader.component.html',
  styleUrls: ['./project-preview-loader.component.scss']
})
export class ProjectPreviewLoaderComponent implements OnInit {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: (bytes: number) => string;
  dragOver: boolean;
  projectId: string;
  cols = 4;
  uploaderHandlers: { [event: string]: (output: UploadOutput) => void };
  @Input() project: Project;
  constructor(
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private auth: AuthenticationService) {

    this.options = { concurrency: 4, allowedContentTypes: ['image/jpeg', 'image/png'] };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.uploaderHandlers = {
      [UploaderEvent.REJECTED]: this.onFileRejected.bind(this),
      [UploaderEvent.ALL_ADDED_TO_QUEUE]: this.onAllFilesAddedToQueue.bind(this),
      [UploaderEvent.ADDED_TO_QUEUE]: this.onFileAddedToQueue.bind(this),
      [UploaderEvent.DRAG_OVER]: this.onDragOverUploader.bind(this),
      [UploaderEvent.DROP]: this.onDropOverUploader.bind(this),
      [UploaderEvent.DONE]: this.onFileUploaded.bind(this)
    };
  }
  get previewItems() {
    return this.project.previewItems;
  }
  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
  }
  limpiarListado() { this.files = []; }


  onFileRejected(output: UploadOutput) {
    this.snackbar.open(`[${output.file.name}] Error: Sólo esta permitido cargar imagenes jpeg/png`);
  }
  onAllFilesAddedToQueue(output: UploadOutput) {
    this.startUpload();
  }
  onFileAddedToQueue(output: UploadOutput) {
    if (typeof output.file !== 'undefined') {
      this.files.push(output.file);
    }
  }
  onUploading(output: UploadOutput) {
    if (typeof output.file !== 'undefined') {
      const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    }
  }
  onRemoveFileUpload(output: UploadOutput) {
    this.files = this.files.filter((file: UploadFile) => file !== output.file);
  }
  onDragOverUploader(output: UploadOutput) {
    this.dragOver = true;
  }
  onDropOverUploader(output: UploadOutput) {
    this.dragOver = false;
  }
  onFileUploaded(output: UploadOutput) {
    const res = output.file.response;
    if (output.file.responseStatus === 200) {
      this.project.addPreviewItem(new PreviewItem(res));
    }
  }
  onUploadOutput(output: UploadOutput): void {
    if (this.uploaderHandlers[output.type]) {
      this.uploaderHandlers[output.type](output);
    }
  }
  getFileError(file: UploadFile) {
    if (file.progress.data.percentage === 100 && file.responseStatus !== 200) {
      return (file.response && file.response.message) || 'Error al intentar subir el archivo.';
    } else { return null; }
  }
  startUpload(): void {
    const event: UploadInput = {
      type: UploadInputEvent.UPLOAD_ALL,
      url: `${environment.apiUrl}/files`,
      headers: { Authorization: 'Bearer ' + this.auth.currentTokenValue },
      method: 'POST',
      data: { projectId: this.projectId }
    };
    this.uploadInput.emit(event);
  }
  allDone() {
    return this.files.find(f => f.progress.data.percentage < 100) === undefined;
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: UploadInputEvent.CANCEL, id });
  }
  removeFile(id: string): void {
    this.uploadInput.emit({ type: UploadInputEvent.REMOVE, id });
  }
  removeAllFiles(): void {
    this.uploadInput.emit({ type: UploadInputEvent.REMOVE_ALL });
  }

  imgUrl(fileData: string) {
    return `${environment.apiUrl}/files/${fileData}`;
  }

  get previewLoaded() {
    return this.project.state !== ProjectState.CREATED;
  }

}

