import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { GaugeModule } from 'angular-gauge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from './../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGaugeModule } from 'ngx-gauge';
import { ChartsRoutingModule } from '../charts/charts-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    PerfectScrollbarModule,
    NgApexchartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    GaugeModule.forRoot(),
    ComponentsModule,
    SharedModule,
    ChartsRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    chartjsModule,
    NgxChartsModule,
    NgApexchartsModule,
    NgxGaugeModule,
    GaugeModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
