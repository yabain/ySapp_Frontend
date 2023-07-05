import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  breadscrums = [
    {
      title: 'Support',
      items: ['Support'],
      active: 'Support'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
