import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first1',
  templateUrl: './first1.component.html',
  styleUrls: ['./first1.component.sass']
})
export class First1Component implements OnInit {
  breadscrums = [
    {
      title: 'First 1',
      items: ['Multilevel'],
      active: 'First 1'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
