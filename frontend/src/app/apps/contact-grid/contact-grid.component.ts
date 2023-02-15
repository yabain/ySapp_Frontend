import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-contact-grid',
  templateUrl: './contact-grid.component.html',
  styleUrls: ['./contact-grid.component.scss']
})
export class ContactGridComponent implements OnInit {
  breadscrums = [
    {
      title: 'Contact Grid',
      items: ['Apps'],
      active: 'Contact Grid'
    }
  ];
  constructor(
    public router: Router
  ) {}

  ngOnInit() {}

  navigateToAddOrganisation(){
    this.router.navigate(['/apps/add-organisation']);
  }
}
