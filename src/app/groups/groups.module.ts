import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsRoutingModule } from './groups-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatButtonModule } from '@angular/material/button';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ComponentsModule } from '../shared/components/components.module';
import { GroupsGridComponent } from './groups-grid/groups-grid.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { GroupsComponent } from './groups.component';
import { MembersComponent } from './members/members.component';
import { FormMessageComponent } from './groups-dialogs/form-message/form-message.component';
import { DeleteDialogComponent } from './groups-dialogs/delete/delete.component';
import { FormDialogComponent } from './groups-dialogs/form-dialog/form-dialog.component';
import { GroupsFormComponent } from './groups-dialogs/groups-form/groups-form.component';
import { GroupsDeleteComponent } from './groups-dialogs/groups-delete/groups-delete.component';

@NgModule({
  declarations: [
    GroupsGridComponent,
    GroupsListComponent,
    DeleteDialogComponent,
    FormMessageComponent,
    FormDialogComponent,
    GroupsComponent,
    MembersComponent,
    GroupsFormComponent,
    GroupsDeleteComponent
  ],
  
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FullCalendarModule,
    PerfectScrollbarModule,
    MatButtonModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSnackBarModule,
    DragDropModule,
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableExporterModule,
    MatSortModule,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatCardModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DragulaModule.forRoot(),
    ComponentsModule
  ]
})

export class GroupsModule {}
