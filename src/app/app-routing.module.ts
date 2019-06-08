import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectGridComponent } from './project-grid/project-grid.component';
import { PreviewGridComponent } from './preview-grid/preview-grid.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ProjectViewComponent } from './project-view/project-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', data: { header: false } },
  { path: 'login', component: LoginComponent, data: { header: false } },
  {
    path: 'projects/:projectId/preview', component: PreviewGridComponent, canActivate: [AuthGuard],
    data: { title: 'Muestra - Carga de Pedido' }
  },
  {
    path: 'projects/:projectId/upload',
    component: ProjectViewComponent,
    canActivate: [AuthGuard],
    data: { section: 'upload', title: 'Carga de Imagenes de Muestra' }
  },
  {
    path: 'projects/:projectId/orders',
    component: ProjectViewComponent,
    canActivate: [AuthGuard],
    data: { section: 'orders', title: 'Pedidos' }
  },
  { path: 'projects/new', component: ProjectFormComponent, canActivate: [AuthGuard], data: { title: 'Nuevo Proyecto' } },
  { path: 'projects', component: ProjectGridComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
