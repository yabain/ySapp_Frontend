import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

declare const ApexCharts: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('chart', { static: true }) chart: ChartComponent;
  public smallBarChart: any;
  public smallAreaChart: any;
  public smallColumnChart: any;
  public smallLineChart: any;
  // public barChartOptions: any;
  public barChartOptions: Partial<ChartOptions>;
  public barChart2Options: any;
  public lineChartOptions: any;
  public lineChart2Options: any;
  public lineColumnChartOptions: any;
  public areaChartOptions: any;
  public pieChartOptions: any;
  public radarChartOptions: any;
  public sampleData = [
    31, 40, 28, 100, 60, 55, 68, 51, 42, 85, 77, 31, 40, 28, 44, 60, 55
  ];


  breadscrums = [
    {
      title: 'Home',
      items: ['Dashboard'],
      active: 'Home'
    }
  ];

  constructor() {}

  ngOnInit() {
    this.cardChart1();
    this.cardChart2();
    this.cardChart3();
    this.cardChart4();
    this.chart1();
    this.chart3();
    this.chart4();
    this.chart7();
  }
  
  private cardChart1() {
    this.smallBarChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '40%'
        }
      },
      series: [
        {
          name: 'income',
          data: this.sampleData
        }
      ],
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {},
        marker: {
          show: false
        }
      }
    };
  }
  private cardChart2() {
    this.smallAreaChart = {
      series: [
        {
          name: 'order',
          data: this.sampleData
        }
      ],
      chart: {
        type: 'area',
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        curve: 'straight'
      },
      colors: ['#00E396'],
      xaxis: {
        labels: {
          show: false
        }
      },
      legend: {
        show: false
      },
      yaxis: {
        show: false
      },
      grid: {
        show: false
      }
    };
  }
  private cardChart3() {
    this.smallColumnChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '40%'
        }
      },
      series: [
        {
          name: 'income',
          data: this.sampleData
        }
      ],

      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {},
        marker: {
          show: false
        }
      }
    };
  }
  private cardChart4() {
    this.smallLineChart = {
      series: [
        {
          name: 'Users',
          data: this.sampleData
        }
      ],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        curve: 'straight',
        colors: ['#FEB019'],
        width: 4
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        marker: {
          show: false
        }
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      legend: {
        show: false
      },
      yaxis: {
        show: false
      },
      grid: {
        show: false
      }
    };
  }

  private chart1() {
    this.barChartOptions = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#9aa0ac'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct'
        ],
        labels: {
          style: {
            colors: '#9aa0ac'
          }
        }
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true
        },
        x: {
          show: true
        }
      }
    };
  }
  private chart3() {
    this.lineChartOptions = {
      chart: {
        height: 350,
        type: 'line',
        shadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 1
        },
        toolbar: {
          show: false
        },
        foreColor: '#9aa0ac'
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      series: [
        {
          name: 'High - 2013',
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: 'Low - 2013',
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      title: {
        text: 'Average High & Low Temperature',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        },
        labels: {
          style: {
            colors: '#9aa0ac'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
        labels: {
          style: {
            color: '#9aa0ac'
          }
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true
        },
        x: {
          show: true
        }
      }
    };
  }
  private chart4() {
    this.lineChart2Options = {
      chart: {
        height: 350,
        type: 'line',
        shadow: {
          enabled: false,
          color: '#bbb',
          top: 3,
          left: 2,
          blur: 3,
          opacity: 1
        },
        foreColor: '#9aa0ac'
      },
      stroke: {
        width: 7,
        curve: 'smooth'
      },
      series: [
        {
          name: 'Likes',
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }
      ],
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000',
          '2/11/2000',
          '3/11/2000',
          '4/11/2000',
          '5/11/2000',
          '6/11/2000',
          '7/11/2000',
          '8/11/2000',
          '9/11/2000',
          '10/11/2000',
          '11/11/2000',
          '12/11/2000',
          '1/11/2001',
          '2/11/2001',
          '3/11/2001',
          '4/11/2001',
          '5/11/2001',
          '6/11/2001'
        ],
        labels: {
          style: {
            colors: '#9aa0ac'
          }
        }
      },
      title: {
        text: 'Social Media',
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#666'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 4,
        opacity: 0.9,
        colors: ['#FFA41B'],
        strokeColor: '#fff',
        strokeWidth: 2,

        hover: {
          size: 7
        }
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: 'Engagement'
        },
        labels: {
          style: {
            color: '#9aa0ac'
          }
        }
      }
    };
  }
  private chart7() {
    this.pieChartOptions = {
      chart: {
        width: 360,
        type: 'pie',
        foreColor: '#9aa0ac'
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      series: [44, 55, 13, 43, 22],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }
}
