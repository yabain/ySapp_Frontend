import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportRoutingModule } from './support-routing.module';
import { FaqsComponent } from './faqs/faqs.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from '../shared/components/components.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '../shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    FaqsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SupportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    ComponentsModule,
    QRCodeModule
  ]
})
export class SupportModule {}
