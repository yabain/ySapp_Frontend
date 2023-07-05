import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})

export class GroupsComponent
  implements OnInit {
  breadscrums = [
    {
      title: 'Contacts',
      items: ['Home'],
      active: 'Contacts'
    }
  ];

  constructor(
  ) {
  }
  ngOnInit() {
    this.scrollToTop();
  }


  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

}
