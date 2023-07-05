import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  public Editor = ClassicEditor;
  breadscrums = [
    {
      title: 'Chat',
      items: ['Email'],
      active: 'Chat'
    }
  ];
  constructor() {}
}
