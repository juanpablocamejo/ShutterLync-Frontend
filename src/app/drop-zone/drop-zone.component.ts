import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput, humanizeBytes } from 'ngx-uploader';
import { MatSnackBar } from '@angular/material';
import { UploaderEvent } from 'src/shared/models/enums/UploaderEvent';
import { UploadInputEvent } from 'src/shared/models/enums/UploadInputEvent';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/shared/services/authentication.service';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss']
})
export class DropZoneComponent {
  @Input() url: string;
  @Input() data: any;
  @Input() disableUpload = false;
  @Input() disableList = false;
  @Input() dropText = 'Arrastre los archivos hasta aquí';
  @Input() disabled: boolean;
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[] = [];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: (bytes: number) => string;
  dragOver: boolean;
  uploaderHandlers: { [event: string]: (output: UploadOutput) => void };
  @Output() fileAdded = new EventEmitter<UploadFile>();
  @Output() fileUploaded = new EventEmitter();
  @Output() allAdded = new EventEmitter<UploadFile[]>();
  @ViewChild('fileInput') refFileInput: ElementRef;
  @ViewChild('folderInput') refFolderInput: ElementRef;

  constructor(
    private snackbar: MatSnackBar,
    private auth: AuthenticationService) {
    this.options = { concurrency: 4, allowedContentTypes: ['image/jpeg', 'image/png'] };
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


  limpiarListado() {
    this.files = []; this.clearInputs();
  }

  getFileProgress(file: UploadFile) {
    return this.disableUpload ? 100 : file.progress.data.percentage;
  }
  getFileColor(item: UploadFile) {
    return (!this.disableUpload && (item.progress.status === 2 && item.responseStatus !== 200)) ? 'warn' : 'primary';
  }
  onFileRejected(output: UploadOutput) {
    this.snackbar.open(`[${output.file.name}] Error: Sólo esta permitido cargar imagenes jpeg/png`);
  }
  onAllFilesAddedToQueue(output: UploadOutput) {
    this.allAdded.emit(this.files);
    if (!this.disableUpload) {
      this.startUpload();
    } else {
      this.clearInputs();
    }
  }
  onFileAddedToQueue(output: UploadOutput) {
    if (typeof output.file !== 'undefined') {
      this.files.push(output.file);
      if (this.disableUpload) {
        this.fileAdded.emit(output.file);
      }
    }
  }

  clearInputs() {
    this.refFileInput.nativeElement.value = '';
    this.refFolderInput.nativeElement.value = '';
  }
  onUploading(output: UploadOutput) {
    if (!this.disableUpload && typeof output.file !== 'undefined') {
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
      this.fileUploaded.emit(res);
    }
    if (this.allDone()) { this.clearInputs(); }
  }
  onUploadOutput(output: UploadOutput): void {
    if (this.uploaderHandlers[output.type]) {
      this.uploaderHandlers[output.type](output);
    }
  }
  getFileError(file: UploadFile) {
    if (this.disableUpload) { return null; }
    if (file.progress.data.percentage === 100 && file.responseStatus !== 200) {
      return (file.response && file.response.message) || 'Error al intentar subir el archivo.';
    } else { return null; }
  }
  startUpload(): void {
    const event: UploadInput = {
      type: UploadInputEvent.UPLOAD_ALL,
      url: this.url,
      headers: { Authorization: 'Bearer ' + this.auth.currentTokenValue },
      method: 'POST',
      data: this.data
    };
    this.uploadInput.emit(event);
  }

  allDone() {
    return this.disableUpload || this.files.find(f => f.progress.data.percentage < 100) === undefined;
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

}

