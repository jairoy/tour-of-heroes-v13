import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ConfirmationDialogComponent } from './components/dialog-confirmation/confirmation-dialog.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { IconsModule } from '../icons/icons.module';


const CORE_COMPONENTS = [
  ConfirmationDialogComponent,
  LoadingComponent,
  MessagesComponent,
  PageNotFoundComponent,
  ToolbarComponent
]
const MODULES = [
  FlexLayoutModule,
  IconsModule,
  MaterialModule,
  RouterModule
]

@NgModule({
  declarations: [CORE_COMPONENTS],
  exports: [CORE_COMPONENTS],
  imports: [CommonModule,MODULES],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule){
    if(parentModule){
      throw new Error("CoreModule has already been loaded. Import this module in the AppModule.");      
    }
  }
 }