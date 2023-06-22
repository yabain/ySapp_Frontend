import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { SupportComponent } from './support/support.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', redirectTo: 'groups-grid', pathMatch:'full'},
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'groups-grid',
    component: ContactGridComponent
  },
  {
    path: 'contacts',
    component: ContactGridComponent
  },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'dragdrop',
    component: DragDropComponent
  },
  { path: '**', redirectTo: 'groups-grid', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class GroupsRoutingModule {}
