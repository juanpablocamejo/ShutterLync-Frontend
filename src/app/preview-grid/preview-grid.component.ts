import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/shared/models/project';
import { ProjectService } from 'src/shared/services/project.service';
import { PreviewItem } from 'src/shared/models/previewItem';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-preview-grid',
  templateUrl: './preview-grid.component.html',
  styleUrls: ['./preview-grid.component.scss']
})
export class PreviewGridComponent {

  @Input() project: Project;
  public cols = 4;
  public selectedItems: number;

  onSelectionChange(previewItem: PreviewItem, selected: any) {
    this.selectedItems += event ? 1 : -1;
  }

  saveOrder() {
    const orderItems: PreviewItem[] = this.project.previewItems.filter((itm => itm.selectedByClient));

    this.projectService.saveOrder(this.project._id, orderItems.map(itm => itm._id));
  }
  previewItems(): PreviewItem[] {
    return this.project ? this.project.previewItems : [];
  }

  constructor(private projectService: ProjectService, private mediaObserver: MediaObserver) {

    this.mediaObserver.asObservable()
      .subscribe((change: MediaChange[]) => {
        this.cols = this.getCols();
      });
  }

  getCols(): number {
    const grid = new Map([
      ['xs', 1],
      ['sm', 2],
      ['md', 3],
      ['lg', 4],
      ['xl', 4]
    ]);
    let res: number;
    grid.forEach((nCols, mqAlias) => {
      if (this.mediaObserver.isActive(mqAlias)) {
        res = nCols;
      }
    });
    return res;
  }

}
