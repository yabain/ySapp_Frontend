import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { fakeBackendProvider } from './core/interceptor/fake-backend';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClickOutsideModule } from 'ng-click-outside';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient
} from '@angular/common/http';
import { WINDOW_PROVIDERS } from './core/service/window.service';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { initializeKeycloak } from './shared/utils/helpers';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    WINDOW_PROVIDERS,
    {
      provide:APP_INITIALIZER,
      useFactory:initializeKeycloak,
      multi:true,
      deps:[KeycloakService,Router]
    },

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    LoadingBarRouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    CoreModule,
    SharedModule,
    
  ],
  exports: [RightSidebarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
