import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientViewComponent } from './client-view/client-view.component';
import { StudioViewComponent } from './studio-view/studio-view.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectPreviewLoaderComponent } from './project-preview-loader/project-preview-loader.component';
import { PreviewGridComponent } from './preview-grid/preview-grid.component';

const photographerId = '5cc9e907bd67622768a12162';
const clientId = '5cc9e906bd67622768a12161';

const routes: Routes = [
  { path: 'client', component: ClientViewComponent, data: { userId: clientId, } },
  { path: 'client/project/:projectId/preview', component: PreviewGridComponent, data: { userId: clientId, } },
  { path: 'studio', component: StudioViewComponent, data: { userId: photographerId } },
  { path: 'studio/project', component: ProjectFormComponent, data: { userId: photographerId } },
  { path: 'studio/project/:id/preview', component: ProjectPreviewLoaderComponent, data: { userId: photographerId } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
