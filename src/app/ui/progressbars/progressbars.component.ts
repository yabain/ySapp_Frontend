import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbars',
  templateUrl: './progressbars.component.html',
  styleUrls: ['./progressbars.component.scss']
})
export class ProgressbarsComponent implements OnInit {
  breadscrums = [
    {
      title: 'Progress Bar',
      items: ['UI'],
      active: 'Progress Bar'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
