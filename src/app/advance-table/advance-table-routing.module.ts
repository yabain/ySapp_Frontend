import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AdvanceTableComponent } from './advance-table.component';

const routes: Routes = [
  {
    path: '',
    component: AdvanceTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class AdvanceTableRoutingModule {}
