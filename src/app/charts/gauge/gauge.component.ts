import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.sass']
})
export class GaugeComponent implements OnInit, OnDestroy {
  breadscrums = [
    {
      title: 'Gauge',
      items: ['Charts'],
      active: 'Gauge'
    }
  ];

  // ngx-guage start

  gaugeValue = 28.3;
  gaugeSize = 170;
  guageThick = 8;

  guageType1 = 'full';
  guageType2 = 'semi';
  guageType3 = 'arch';

  // ngx-guage end

  constructor() {
    this.percentageValue = function (value: number): string {
      return `${Math.round(value)} / ${this['max']}`;
    };
  }

  percentageValue: (value: number) => string;
  gaugeValues: any = {
    1: 100,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50
  };
  interval: any;

  ngOnInit(): void {
    const updateValues = (): void => {
      this.gaugeValues = {
        1: Math.round(Math.random() * 100),
        2: Math.round(Math.random() * 100),
        3: Math.round(Math.random() * 100),
        4: Math.round(Math.random() * 100),
        5: Math.round(Math.random() * 200),
        6: Math.round(Math.random() * 100),
        7: Math.round(Math.random() * 100)
      };
    };
    const INTERVAL: number = 3000;
    this.interval = setInterval(updateValues, INTERVAL);
    updateValues();
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
