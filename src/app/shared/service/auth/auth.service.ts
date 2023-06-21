import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user/user.service';
import { async } from '@angular/core/testing';
import { User } from '../../entities/user/user';
import { ApiService } from '../api/api.service';
import { WebStorage } from '../storage/web.storage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: BehaviorSubject<KeycloakProfile> =new BehaviorSubject<KeycloakProfile>(null);


  userData!: User;
  isAuthenticated = false;
  authStatus!: boolean;
  params: any;
  registResult = false;
  reload = 0;
  isAdmin = false;
  isUser = false;

  constructor(
    private readonly keycloak: KeycloakService
  ) {
    this.keycloak.isLoggedIn()
    .then(async (authenticated) => {
      console.log("Auth",authenticated)
      this.isAuthenticated = authenticated;
      if (authenticated) {
        const roles = this.keycloak.getUserRoles();
        this.isUser = roles.includes('USER');
        this.isAdmin = roles.includes('ADMIN');
        this.currentUser.next(await this.keycloak.loadUserProfile())
      }
    })
    .catch ((error) => {
      console.error(error);
    });

  }

  public isLoggedIn():Promise<boolean>
  {
    return this.keycloak.isLoggedIn()
  }
  public loadUserProfile():Promise<KeycloakProfile>
  {
    return this.keycloak.loadUserProfile()
  }

  public redirectToProfile()
  {
    this.keycloak.getKeycloakInstance().accountManagement()
  }

  getRoles():string[]
  {
    return this.keycloak.getUserRoles()
  }
 
  // Login into your account
  authLogin() {
    this.keycloak.login();    
  }
 
  logout()
  {
    this.keycloak.logout();
  }

}
