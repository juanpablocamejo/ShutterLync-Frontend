import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectFormComponent } from './new-project-view/project-form.component';
import { ProjectGridComponent } from './home-view/project-grid.component';
import { PreviewGridComponent } from './project-view/preview-grid/preview-grid.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ProjectViewComponent } from './project-view/project-view.component';
import { SearchViewComponent } from './search-view/search-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchViewComponent },
  {
    path: 'projects/:projectId',
    component: ProjectViewComponent,
  },
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
  { path: 'new_project', component: ProjectFormComponent, canActivate: [AuthGuard], data: { title: 'Nuevo Proyecto' } },
  { path: 'projects', component: ProjectGridComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
