import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GroupsComponent } from './groups.component';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  { path: '', redirectTo: 'groups-list', pathMatch: 'full' },
  {
    path: 'groups-grid',
    component: GroupsComponent
  },
  {
    path: 'groups-grid/:id',
    component: MembersComponent
  },
  { path: '**', redirectTo: 'groups-grid', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})

export class GroupsRoutingModule { }
