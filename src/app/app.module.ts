import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TestComponent } from './test/test.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';
import { ApiModule, Configuration } from 'src/pet-client';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';
import { DetalleEtapaModalComponent } from './components/detalle-etapa-modal/detalle-etapa-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    RoadmapComponent,
    TestComponent,
    DetalleEtapaModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ApiModule.forRoot(apiConfiguration),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function apiConfiguration(): Configuration {  
  return new Configuration(environment.apiConfiguration.pet) 
}