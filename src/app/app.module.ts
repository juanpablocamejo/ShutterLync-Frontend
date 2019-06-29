import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InViewportModule } from 'ng-in-viewport';

import { AppComponent } from './app.component';
import { PreviewGridComponent } from './project-view/preview-grid/preview-grid.component';
import { PreviewGridItemComponent } from './project-view/preview-grid/preview-grid-item/preview-grid-item.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ProjectFormComponent } from './new-project-view/project-form.component';
import { AppDateAdapter, APP_DATE_FORMATS } from '../shared/adapters/date.adapter';
import { ProjectPreviewLoaderComponent } from './project-view/project-preview-loader/project-preview-loader.component';
import { FileDropModule } from 'ngx-file-drop';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { ProjectGridComponent } from './home-view/project-grid.component';
import { ProjectGridItemComponent } from './home-view/project-grid-item/project-grid-item.component';
import { LoginComponent } from './login/login.component';
import { HttpErrorInterceptor } from 'src/shared/interceptors/http-error.interceptor';
import { NgxUploaderModule } from 'ngx-uploader';
import { ResponsiveColsDirective } from 'src/shared/directives/responsive-cols.directive';
import { AuthInterceptor } from 'src/shared/interceptors/auth.interceptor';
import { XhrSrcDirective } from 'src/shared/directives/xhr-src.directive';
import { LoaderPreviewItemComponent } from './project-view/project-preview-loader/loader-preview-item/loader-preview-item.component';
import { NewProjectGridItemComponent } from './home-view/new-project-grid-item/new-project-grid-item.component';
import { LoadingComponent } from 'src/shared/components/loading/loading.component';
import { LoadingInterceptor } from 'src/shared/interceptors/loading.interceptor';
import { LoadingService } from 'src/shared/services/loading.service';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectOrdersComponent } from './project-view/project-orders/project-orders.component';
import { ActionsToolbarComponent } from './actions-toolbar/actions-toolbar.component';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { SearchViewComponent } from './search-view/search-view.component';
import { ClientSearchFieldComponent } from './client-search-field/client-search-field.component';
import { RemoveHostDirective } from '../shared/directives/remove-host.directive';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ProjectStatePipe } from 'src/shared/pipes/projectState.pipe';
import { SpanishMatPaginatorIntl } from 'src/shared/adapters/MatPaginatorIntl';
import { MatPaginatorIntl } from '@angular/material';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { PreviewItemComponent } from './preview-item/preview-item.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
registerLocaleData(localeEsAr, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    PreviewGridComponent,
    PreviewGridItemComponent,
    SuccessDialogComponent,
    ProjectFormComponent,
    ProjectPreviewLoaderComponent,
    ProjectGridComponent,
    ProjectGridItemComponent,
    LoginComponent,
    ResponsiveColsDirective,
    XhrSrcDirective,
    LoaderPreviewItemComponent,
    NewProjectGridItemComponent,
    LoadingComponent,
    ProjectViewComponent,
    ProjectOrdersComponent,
    ActionsToolbarComponent,
    SearchViewComponent,
    ClientSearchFieldComponent,
    RemoveHostDirective,
    ProjectStatePipe,
    ConfirmationDialogComponent,
    PreviewItemComponent,
    DropZoneComponent
  ],
  imports: [
    BrowserModule,
    InViewportModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FileDropModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    NgxUploaderModule,
    SatDatepickerModule,
    SatNativeDateModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    SuccessDialogComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    LoadingService,
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: MatPaginatorIntl, useValue: new SpanishMatPaginatorIntl()
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
