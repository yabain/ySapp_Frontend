import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-preset-msg',
  templateUrl: './preset-msg.component.html',
  styleUrls: ['./preset-msg.component.scss']
})
export class PresetMsgComponent implements OnInit {
  public Editor = ClassicEditor;
  breadscrums = [
    {
      title: 'Presets',
      items: ['Message'],
      active: 'Presets'
    }
  ];
  constructor() {}

  ngOnInit() {
    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
