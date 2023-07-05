import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.group.component.html',
  styleUrls: ['./compose.group.component.scss']
})
export class ComposeGroupComponent implements OnInit{
  public Editor = ClassicEditor;
  messageForm : FormGroup;
  breadscrums = [
    {
      title: 'Compose to group',
      items: ['Message'],
      active: 'Compose to group'
    }
  ];
  constructor(
    private formLog: FormBuilder
  ) {}

  ngOnInit(): void {
    this.scrollToTop();
      
    this.messageForm = this.formLog.group({
      'contact': ['', Validators.compose([
        Validators.minLength(6)])],
      'subject': ['', Validators.compose([
        Validators.minLength(6)])],
      'message': ['', Validators.compose([
        Validators.minLength(6)])],
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
