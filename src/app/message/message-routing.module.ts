import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { WebChatComponent } from './web-chat/web.chat.component';
import { ComposeGroupComponent } from './compose-group/compose.group.component';
import { ComposeComponent } from './compose/compose.component';
import { TranslateModule } from '@ngx-translate/core';
import { PresetMsgComponent } from './preset-msg/preset-msg.component';

const routes: Routes = [
  { path: '', redirectTo: 'compose', pathMatch: 'full' },
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'compose-to-group',
    component: ComposeGroupComponent
  },
  {
    path: 'compose-to-group/:id',
    component: ComposeGroupComponent
  },
  {
    path: 'compose',
    component: ComposeComponent
  },
  {
    path: 'preset-msg',
    component: PresetMsgComponent
  },
  {
    path: 'web-chat',
    component: WebChatComponent
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('../calendar/calendar.module').then((m) => m.CalendarsModule)
  },
  { path: '**', redirectTo: '/dashboard/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class MessageRoutingModule {}
