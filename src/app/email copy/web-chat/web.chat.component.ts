import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-chat',
  templateUrl: './web.chat.component.html',
  styleUrls: ['./web.chat.component.sass']
})
export class WebChatComponent implements OnInit {
  breadscrums = [
    {
      title: 'Web chat',
      items: ['Multilevel', 'Second'],
      active: 'Web chat'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
