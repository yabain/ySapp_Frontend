import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-groups-grid',
  templateUrl: './groups-grid.component.html',
  styleUrls: ['./groups-grid.component.scss']
})
export class GroupsGridComponent implements OnInit {
  breadscrums = [
    {
      title: 'Groups Grid',
      items: ['Groups'],
      active: 'Groups Grid'
    }
  ];
  
  constructor(
    public router: Router
  ) {}

  ngOnInit() {
    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  navigateToAddOrganisation(){
    this.router.navigate(['/apps/add-organisation']);
  }
}
