import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  public Editor = ClassicEditor;
  messageForm: FormGroup;


  breadscrums = [
    {
      title: 'Compose',
      items: ['Message'],
      active: 'Compose'
    }
  ];
  constructor(
    private formLog: FormBuilder,) { }

  ngOnInit() {
    // console.log('111 Venant du service: ', this.translationService.getLanguage());    
    this.messageForm = this.formLog.group({
      'contact': ['', Validators.compose([
        Validators.minLength(6)])],
      'subject': ['', Validators.compose([
        Validators.minLength(6)])],
      'message': ['', Validators.compose([
        Validators.minLength(6)])],
    });

  }

  get f() {
    return this.messageForm.controls;
  }

  submit(){
    console.log('venant du form: ', this.messageForm.value);

  }
}
