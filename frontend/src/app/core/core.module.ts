import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthGuard } from '../shared/guard/auth.guard';
// import { AuthService } from './service/auth.service';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';
import { throwIfAlreadyLoaded } from '../shared/guard/module-import.guard';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AuthService } from '../shared/service/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule,KeycloakAngularModule],
  exports:[
    KeycloakAngularModule
  ],
  providers: [
    RightSidebarService,
    
    AuthGuard,
    AuthService,
    DynamicScriptLoaderService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
