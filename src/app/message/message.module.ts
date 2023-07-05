import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxComponent } from './inbox/inbox.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from '../shared/components/components.module';
import { ComposeGroupComponent } from './compose-group/compose.group.component';
import { ComposeComponent } from './compose/compose.component';
import { MessageRoutingModule } from './message-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { PresetMsgComponent } from './preset-msg/preset-msg.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { WebChatComponent } from './web-chat/web.chat.component';

@NgModule({
  declarations: [
    ComposeGroupComponent,
    InboxComponent,
    PresetMsgComponent,
    ComposeComponent,
    WebChatComponent
],
  imports: [
    CommonModule,
    MessageRoutingModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsModule,
    MatSlideToggleModule,
    MatSliderModule,
  ]
})
export class MessageModule {}
