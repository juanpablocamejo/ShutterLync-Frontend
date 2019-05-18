import { Component, OnInit, EventEmitter } from '@angular/core';
import { UploadInput, UploadOutput, humanizeBytes, UploaderOptions, UploadFile } from 'ngx-uploader';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/shared/models/Project';
import { ProjectService } from 'src/shared/services/project.service';
import { PreviewItem } from 'src/shared/models/previewItem';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { calcGridColumns } from 'src/shared/utils/utils';
import { MatSnackBar } from '@angular/material';


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
  humanizeBytes: Function;
  dragOver: boolean;
  projectId: string;
  previewItems: PreviewItem[];
  cols = 4;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private mediaObserver: MediaObserver,
    private snackbar: MatSnackBar) {

    this.options = { concurrency: 4, allowedContentTypes: ['image/jpeg', 'image/png'] };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.mediaObserver.asObservable()
      .subscribe((change: MediaChange[]) => {
        this.cols = this.getCols();
      });
  }

  getCols(): number {
    return calcGridColumns(this.mediaObserver, { xs: 1, sm: 2, md: 4, lg: 5, xl: 6 });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
    this.projectService.getProject(this.projectId).subscribe(
      (project: Project) => {
        this.previewItems = project.previewItems;
      }
    );
  }
  limpiarListado() { this.files = []; }
  onUploadOutput(output: UploadOutput): void {
    console.log(output);
    switch (output.type) {
      case 'rejected':
        this.snackbar.open(`[${output.file.name}] Error: Sólo esta permitido cargar imagenes jpeg/png`);
        break;
      case 'allAddedToQueue':
        this.startUpload();
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);

        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        const res = output.file.response;
        if (output.file.responseStatus === 200) {
          this.previewItems.push(output.file.response);
          // this.files = this.files.filter((file: UploadFile) => file !== output.file);
        }
        break;
    }
  }
  getFileError(file: UploadFile) {
    if (file.progress.data.percentage === 100 && file.responseStatus !== 200) {
      return (file.response && file.response.message) || 'Error al intentar subir el archivo.';
    } else { return null; }
  }
  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: `${environment.apiUrl}/files`,
      method: 'POST',
      data: { projectId: this.projectId }
    };

    this.uploadInput.emit(event);
  }
  allDone() {
    return this.files.find(f => f.progress.data.percentage < 100) === undefined;
  }
  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  imgUrl(fileData: string) {
    return `${environment.apiUrl}/files/${fileData}`;
  }
}

