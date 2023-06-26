import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GroupsGridComponent } from './groups-grid/groups-grid.component';

const routes: Routes = [
  { path: '', redirectTo: 'groups-grid', pathMatch:'full'},
  {
    path: 'groups-grid',
    component: GroupsGridComponent
  },
  {
    path: 'groups',
    component: GroupsGridComponent
  },
  { path: '**', redirectTo: 'groups-grid', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class GroupsRoutingModule {}
