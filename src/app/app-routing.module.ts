import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then(
            (m) => m.ContactModule
          )
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar.module').then((m) => m.CalendarsModule)
      },
      {
        path: 'task',
        loadChildren: () =>
          import('./task/task.module').then((m) => m.TaskModule)
      },
      // {
      //   path: 'contacts',
      //   loadChildren: () =>
      //     import('./contacts/contacts.module').then((m) => m.ContactsModule)
      // },
      {
        path: 'message',
        loadChildren: () =>
          import('./message/message.module').then((m) => m.MessageModule)
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./apps/apps.module').then((m) => m.AppsModule)
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./groups/groups.module').then((m) => m.GroupsModule)
      },
      {
        path: 'widget',
        loadChildren: () =>
          import('./widget/widget.module').then((m) => m.WidgetModule)
      },
      {
        path: 'ui',
        loadChildren: () => import('./ui/ui.module').then((m) => m.UiModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./forms/forms.module').then((m) => m.FormModule)
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./tables/tables.module').then((m) => m.TablesModule)
      },
      {
        path: 'media',
        loadChildren: () =>
          import('./media/media.module').then((m) => m.MediaModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'timeline',
        loadChildren: () =>
          import('./timeline/timeline.module').then((m) => m.TimelineModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'extra-pages',
        loadChildren: () =>
          import('./extra-pages/extra-pages.module').then(
            (m) => m.ExtraPagesModule
          )
      },
      {
        path: 'support',
        loadChildren: () =>
          import('./support/support.module').then(
            (m) => m.SupportModule
          )
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profil/profil.module').then(
            (m) => m.ProfilModule
          )
      },
      {
        path: 'maps',
        loadChildren: () =>
          import('./maps/maps.module').then((m) => m.MapsModule)
      },
      {
        path: 'multilevel',
        loadChildren: () =>
          import('./multilevel/multilevel.module').then(
            (m) => m.MultilevelModule
          )
      }
    ]
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      )
  },
  { path: '**', redirectTo: 'authentication', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
