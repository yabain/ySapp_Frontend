import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '**',
    component: FaqsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, 
    TranslateModule]
})
export class SupportRoutingModule {}
