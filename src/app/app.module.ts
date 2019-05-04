import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {
  MatCardModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatToolbarModule,
  MatDialogModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { InViewportModule } from 'ng-in-viewport';

import { AppComponent } from './app.component';
import { PreviewGridComponent } from './preview-grid/preview-grid.component';
import { PreviewGridItemComponent } from './preview-grid-item/preview-grid-item.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { StudioViewComponent } from './studio-view/studio-view.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { AppDateAdapter, APP_DATE_FORMATS } from '../shared/adapters/date.adapter';
import { ProjectPreviewLoaderComponent } from './project-preview-loader/project-preview-loader.component';
import { FileDropModule } from 'ngx-file-drop';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';


@NgModule({
  declarations: [
    AppComponent,
    PreviewGridComponent,
    PreviewGridItemComponent,
    SuccessDialogComponent,
    ClientViewComponent,
    StudioViewComponent,
    ProjectFormComponent,
    ProjectPreviewLoaderComponent
  ],
  imports: [
    BrowserModule,
    InViewportModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    FileDropModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    SuccessDialogComponent
  ],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
