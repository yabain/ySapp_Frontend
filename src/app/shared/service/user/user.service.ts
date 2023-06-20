import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { User } from '../../entities/user/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User = new User();

  currentUserSubject:Subject<User> = new Subject<User>();
  public static isUser = true;

  listUser:User[]=[];

  params: any;
  userData: any;

  constructor(
    private api: ApiService,
    private router: Router,
    // private toastr: ToastrService,
    // private authService: AuthService
  ) { }

  /*
*  Set the user informations.
*/
  setUserInformations(user: any) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    //this.login.isLoggedIn = true;
  }

  emitUserData()
  {
    this.currentUserSubject.next(this.userData);
  }

  /*
  *  Get local user profile data.
  */
  getLocalStorageUser() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this.emitUserData();
    if (this.userData) {
      // this.login.isLoggedIn = true;
      return this.userData;
    } else {
      // this.login.isLoggedIn = false;
      return false;
    }
  }
}
