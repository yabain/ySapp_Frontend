import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: []
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') == undefined) {
      this.authService.loadUserProfile()
        .then((user) => {
          console.log('Loading user profile')
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
    }
  }
}
