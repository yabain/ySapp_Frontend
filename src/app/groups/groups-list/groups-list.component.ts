import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';
import {
  Event,
  NavigationStart, Router
} from '@angular/router';
import { MessageService } from 'src/app/shared/service/message/message.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Group } from 'src/app/shared/entities/group/group';
import { MatDialog } from '@angular/material/dialog';
import { GroupsFormComponent } from '../groups-dialogs/groups-form/groups-form.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { GroupsService } from 'src/app/shared/service/groups/groups.service';
import { GroupsDeleteComponent } from '../groups-dialogs/groups-delete/groups-delete.component';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  waitingGroups: boolean;
  waitingSend: boolean;
  submitted = true;
  groupsList: any;
  url: string;
  splitVal;
  base;
  page;
  id: number;
  curentGroupId: string;
  group: Group | null;
  groupsData: any = [
    {
      id: 'sjkdhfsjdkhsjjkjkjkjkjkjkj',
      name: 'Yaba-In',
      description: 'Ici figure la description Yaba-In',
      members: 10
    },
    {
      id: 'sozueizuezuezihu',
      name: 'UdM',
      description: 'Ici figure la description UdM',
      members: 100
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
    private massageService: MessageService,
    public dialog: MatDialog,
    private groupsService: GroupsService,
  ) {
    super();
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
    this.waitingGroups = this.groupsService.waitingGroups;
  }

  contextMenuPosition = { x: '0px', y: '0px' };
  contextMenu: MatMenuTrigger;

  ngOnInit(): void {
    this.scrollToTop();
    if (localStorage.getItem('groups-list')) {
      this.groupsList = JSON.parse(localStorage.getItem('groups-list'));
      this.waitingGroups = this.groupsService.waitingGroups;
    } else {
      // this.groupsList = this.groupsData;
      this.refresh();
    }
  }


  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  submit() {
  }

  navigateToLevel(groupId) {
    this.router.navigateByUrl(`groups/groups-list/${groupId}`);
    this.curentGroupId = groupId;
  }

  getCurrentGroupId(): any {
    const urlId = this.router.url.split('/');
    return urlId[3];
  }

  onContextMenu(event: MouseEvent, item: Group) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  addNew() {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(GroupsFormComponent, {
      data: {
        group: this.group,
        action: 'add'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // setTimeout(() => {
          this.refresh();
          // this.refreshTable();
        // }, 5000);
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService

        // this.exampleDatabase.dataChange.value.unshift(
        //   this.contactService.getDialogData()
        // );

      }
    });
  }

  deleteGroup(group) {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(GroupsDeleteComponent, {
      data: {
        group: group,
        action: 'delete'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // setTimeout(() => {
          this.refresh();
          // this.refreshTable();
        // }, 5000);
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService

        // this.exampleDatabase.dataChange.value.unshift(
        //   this.contactService.getDialogData()
        // );

      }
    });
  }
  refresh() {
    this.waitingGroups = true;
    this.groupsService.getAllGroups()
      .then((groups) => {
        this.groupsList = groups;
        this.waitingGroups = this.groupsService.waitingGroups = false;
      })
      .catch((err) => {
        this.waitingGroups = this.groupsService.waitingGroups = false;
        console.error(err)
      });
  }

  editCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(GroupsFormComponent, {
      data: {
        group: row,
        action: 'edit'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // setTimeout(() => {
          // When using an edit things are little different, firstly we find record inside DataService by id
          // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          //   (x) => x.id === this.id
          // );
          this.refresh();
          // Then you update that record using data from dialogData (values you enetered)
          // this.exampleDatabase.dataChange.value[foundIndex] =
          //   this.contactService.getDialogData();
          // And lastly refresh table
          // this.refreshTable();
        // }, 5000);
      }
    });
  }

}

