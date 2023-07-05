import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ComposeComponent } from './compose/compose.component';
import { ChatComponent } from './chat/chat.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { WebChatComponent } from './web-chat/web.chat.component';

const routes: Routes = [
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'compose',
    component: ComposeComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'read-mail',
    component: ReadMailComponent
  },
  {
    path: 'web-chat',
    component: WebChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {}
