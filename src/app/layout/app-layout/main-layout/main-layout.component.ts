import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: []
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') == undefined) {
      this.userService.getCurrentUser();
    }
  }
}
