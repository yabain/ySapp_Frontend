import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { User } from '../../entities/user/user';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User = new User();

  currentUserSubject: Subject<User> = new Subject<User>();
  public static isUser = true;

  listUser: User[] = [];

  params: any;
  userData: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private readonly keycloak: KeycloakService,
    private authService: AuthService
  ) { }

  
  setUserInformations(user: any) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  emitUserData() {
    this.currentUserSubject.next(this.userData);
  }

  getLocalStorageUser() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this.emitUserData();
    if (this.userData) {
      // this.login.isLoggedIn = true;
      return this.userData;
    } else {
      return this.getCurrentUser();
    }
  }

  getCurrentUser() {
    this.authService.loadUserProfile()
      .then((user) => {
        console.log('Loading user profile')
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get('users')
        .subscribe(result => {
          console.log("Get all users: ", result);
          let tab: any = result;
          localStorage.setItem("users-list", JSON.stringify(tab));
          resolve(result);
          return 0;

        }, error => {
          reject(error);
        });
    });
  }

  addUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.post(`user`, user)
        .subscribe((response: any) => {
          resolve(response);
        }, (error: any) => {
          reject(error);
        });
    })
  }

  deleteUser(userId): Promise<any> {
    
    const param = {
      'id': userId,
    };

    return new Promise((resolve, reject) => {
      this.api.delete('user/profil/' + userId, param)
        .subscribe(response => {
          console.log('User deleted: ', response)
          setTimeout(() => {
          }, 3000);
          resolve(response);
        }, error => {
          reject(error);
        });
    });

  }

  updateUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.put(`user/profil/${user.id}`, user)
        .subscribe((response: any) => {
          resolve(response);
        }, (error: any) => {
          reject(error);
        });
    })
  }

  changeStatus(userId, status): Promise<any> {
    const param = {
      'userId': userId,
      'status': status,
    };

    return new Promise((resolve, reject) => {
      this.api.put('user/profil/status', param)
        .subscribe(response => {
          console.log('change status Response: ', response)
          setTimeout(() => {
            resolve(response);
          }, 1000);
        }, error => {
          console.log("User error", error);
          reject(error);
        });
    });

  }

  //recuperer les informations d'un utilisateur
  getUserById(id: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let user: User = this.listUser.find((u) => u._id == id);
      if (user != undefined) resolve(user);
      else {
        this.api.get(`user/profil/${id}`)
          .subscribe(success => {
            if (success) {
              // console.log("Success ",success)
              if (success.resultCode == 0) {
                resolve(this.parseDataFromApi(success.result));
              }
              else reject(success)

            }
            else reject(success)
          }, error => {
            reject(error);
          })
      }
    })
  }

  // Get user's activity
  getUserActivities(userId: any, pageNumber?: number, itemsPerPage?: number): Promise<any> {
    if (!pageNumber) {
      pageNumber = 1;
    }
    if (!itemsPerPage) {
      itemsPerPage = 1;
    }

    return new Promise((resolve, reject) => {
      const param = {
        // 'id': pageNumber,
        'id': userId,
        'page': pageNumber,
        'limit': itemsPerPage,
      };

      this.api.get(`/user/history`, param)
        .subscribe(data => {
          resolve(data);
          return 0;

        }, (error: any) => {
          reject(error);
        });
    });
  }

  parseDataFromApi(userApiData: Record<string | number, any>): User {
    let user: User = new User();
    user.id = userApiData._id;
    user.firstName = userApiData.firstName;
    user.lastName = userApiData.lastName;
    user.email = userApiData.email;
    user.phone = userApiData.phoneNumber;
    user.imageUrl = userApiData.profilePicture;
    user.dateCreation = userApiData.createdAt;
    user.country = userApiData.country;
    user.city = userApiData.location;
    user.adress = userApiData.address;
    user.description = userApiData.bio;
    return user;
  }

}
