import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-read-mail',
  templateUrl: './read-mail.component.html',
  styleUrls: ['./read-mail.component.scss']
})
export class ReadMailComponent implements OnInit {
  public Editor = ClassicEditor;
  breadscrums = [
    {
      title: 'Read',
      items: ['Email'],
      active: 'Read'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
