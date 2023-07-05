import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GroupsGridComponent } from './groups-grid/groups-grid.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsComponent } from './groups.component';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      { path: '', redirectTo: 'groups-list', pathMatch: 'full' },
      {
        path: 'groups-grid',
        component: GroupsGridComponent
      },
      {
        path: 'groups-list/:id',
        component: MembersComponent
      },
      {
        path: '**',
        component: MembersComponent
      },
    ]
  },
  { path: '**', redirectTo: 'groups-grid', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class GroupsRoutingModule {}
