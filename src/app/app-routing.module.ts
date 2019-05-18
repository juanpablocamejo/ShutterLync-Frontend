import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectGridComponent } from './project-grid/project-grid.component';
import { PreviewGridComponent } from './preview-grid/preview-grid.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AppComponent } from './app.component';
import { ProjectPreviewLoaderComponent } from './project-preview-loader/project-preview-loader.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', data: { header: false } },
  { path: 'login', component: LoginComponent, data: { header: false } },
  { path: 'projects/:projectId/preview', component: PreviewGridComponent, canActivate: [AuthGuard] },
  { path: 'projects/:projectId/upload', component: ProjectPreviewLoaderComponent, canActivate: [AuthGuard] },
  { path: 'projects/new', component: ProjectFormComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectGridComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
