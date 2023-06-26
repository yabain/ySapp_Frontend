import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';
import {
  Event,
  NavigationStart, Router
} from '@angular/router';
import { Message } from 'src/app/shared/entities/message/message';
import { MessageService } from 'src/app/shared/service/message/message.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.group.component.html',
  styleUrls: ['./compose.group.component.scss']
})
export class ComposeGroupComponent implements OnInit {
  waitingGroups = true;
  waitingSend = false;
  submitted = true;
  groupsList: any;
  contactsList: any;
  messageForm: UntypedFormGroup;
  url: string;
  splitVal;
  base;
  page;
  curentGroupId: string;
  groupsData: any = [
    {
      id: 'sjkdhfsjdkhsjjkjkjkjkjkjkj',
      name: 'Yaba-In',
      members: 10
    },
    {
      id: 'sozueizuezuezihu',
      name: 'UdM',
      members: 100
    },
    {
      id: 'jkdjnzebmzhieizeu',
      name: 'Groupe SIA',
      members: 20
    },

  ]

  public Editor = ClassicEditor;

  breadscrums = [
    {
      title: 'Compose to group',
      items: ['Message'],
      active: 'Compose to group'
    }
  ];

  constructor(
    private router: Router,
    private formLog: FormBuilder,
    location: Location,
    private form: UntypedFormBuilder,
    private massageService: MessageService
  ) {
    
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event instanceof NavigationStart) {
          this.splitVal = event.url.split('/');
          this.base = this.splitVal[1];
          this.page = this.splitVal[2];
          this.curentGroupId = this.splitVal[3];
          console.log("splitVal: ", this.splitVal)
        }
      }
    });

    this.url = location.path();
    if (this.url) {
      this.splitVal = this.url.split('/');
      this.base = this.splitVal[1];
      this.page = this.splitVal[2];
      if (this.splitVal[3] !== undefined) {
        this.curentGroupId = this.splitVal[3];
        console.log("splitUrl1: ", this.url)
      } else {
        // this.curentGroupId = 'sdfsdfsd';
      }
    }
    

    this.messageForm = this.sendMessageForm();
  }

  ngOnInit(): void {
    this.scrollToTop();
    if (localStorage.getItem('groups-list')) {
      this.groupsList = JSON.parse(localStorage.getItem('groups-list'));
      this.waitingGroups = false;
    } else {
      this.groupsList = this.groupsData;
      this.waitingGroups = false;
    }

    // this.messageForm = this.formLog.group({
    //   'groupsID': [this.curentGroupId, Validators.compose([
    //     Validators.minLength(6)])],
    //   'subject': [''],
    //   'message': ['', Validators.compose([
    //     Validators.minLength(4)])],
    // });
  }

  sendMessageForm(): UntypedFormGroup {
    return this.form.group({
      id: [this.curentGroupId, Validators.compose([
        Validators.minLength(6), Validators.required])],
      subject: [''],
      message: ['',Validators.required]
      });
    }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  submit() {
    this.waitingSend = true
    if(this.curentGroupId){
      let sendMessage = new Message(this.messageForm.getRawValue());
      sendMessage.id = this.curentGroupId;
      this.massageService.sendMessageToGroup([sendMessage.id], sendMessage.message);
      this.waitingSend =false;
      console.log('message de group: ', sendMessage);
    }
  }

  navigateToLevel(groupId) {
    this.router.navigateByUrl(`message/compose-to-group/${groupId}`);
    this.curentGroupId = groupId;
  }

  getCurrentGroupId(): any { 
    const urlId = this.router.url.split('/');
    return urlId[3];
  }

}
