import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthLayoutComponent } from './app-layout/auth-layout/auth-layout.component';
// import { MainLayoutComponent } from './app-layout/main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [CommonModule, NgbModule, MatTabsModule, SharedModule],
  declarations: [
    // AuthLayoutComponent,
    // MainLayoutComponent
  ]
})
export class LayoutModule {}
