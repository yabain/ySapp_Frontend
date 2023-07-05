import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from './material.module';
import { FeatherIconsModule } from './components/feather-icons/feather-icons.module';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
// import { environement } from "./"
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    SocketIoModule.forRoot({
      url: environment.apiUrl
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MaterialModule,
    FeatherIconsModule
  ]
})
export class SharedModule {}
