import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-font-awesome',
  templateUrl: './font-awesome.component.html',
  styleUrls: ['./font-awesome.component.scss']
})
export class FontAwesomeComponent implements OnInit {
  breadscrums = [
    {
      title: 'Font Awesome',
      items: ['Icons'],
      active: 'Font Awesome'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
