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


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public static currentUser: User = new User();

  userData!: User;
  isLoggedIn = false;
  authStatus!: boolean;
  params: any;
  registResult = false;
  reload = 0;


  constructor(
    private router: Router,
    private api: ApiService,
    // private toastr: ToastrService,
    private user: UserService,
    private webStorage: WebStorage
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /*
   *  Get local user profile data.
   */
  getLocalStorageUser() {
    // this.userData = JSON.parse(localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : null);
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '');
    if (this.userData) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  /*
   * resetPassword is used to reset your password.
   */
  resetPassword(email: string) {
    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json',
      };

      const params = {
        'email': email,
      };

      this.api.post('user/auth/reset-password-link', params, headers)
        .subscribe((response: any) => {
          // this.router.navigate(['/login']);
          if (response) {
            console.log('Success00: ', response);
            // this.router.navigate(['login']);
            // this.toastr.success('A password reset link has been sent to your email.', 'Success');
            resolve(response);
            return 0;
          }
        }, (error: any) => {
          console.error('Erreur00: ', error.message);
          if (error.status == 500) {
            // this.toastr.error("Error server, 'Error'");
          } else if (error.status == 400) {
            // this.toastr.error("expected field was not submitted or does not have the correct type", 'Error');
          } else if (error.status == 404) {
            // this.toastr.error("Unknown email address.", 'Error');
          } else {
            // this.toastr.error(error.message, 'Error');

          }
          reject(error);
        });
    });

  }

  /*
   * resetPassword is used to reset your password.
   */
  reNewPassword(password: string, token: string) {
    return new Promise((resolve, reject) => {

      const header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      };

      const params = {
        'password': password,
      };

      this.api.put('user/auth/reset-password', params, header)
        .subscribe((response: any) => {
          if (response) {
            if (response.statusCode == 200) {
              // this.toastr.success('Your password has been updated successfully !', 'Success');
              this.router.navigate(['/login']);
              resolve(response);
              return 0;
            }
            reject(response);
            return 0;
          }
          reject(response);
          return 0;
        }, (error: any) => {
          if (error.status == 401) {
            // this.toastr.error("Your reset request email has expired.", 'Error');

          }
          else if (error.status == 400) {
            // this.toastr.error("Expected field was not submitted or does not have the correct type.", 'Error');

          }
          else if (error.status == 500) {
            // this.toastr.error("Internal Server Error.", 'Error');

          } else {
            // this.toastr.error(error, 'Error');
          }
          reject(error);
        });
    });

  }

  /*
   * logOut function is used to sign out .
   */
  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.clear();
    this.isLoggedIn = false;
    this.reload = 0;
    // this.toastr.success('Your session has been disconnected!', 'Success');
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
    return of({ success: false });
  }

  /**
   *  Create an account
   *
   */
  createAccount(user: User): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      const body = {
        "email": user.email,
        "status": user.status,
        "password": user.password,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "imageUrl": user.imageUrl,
        "gender": user.gender,
        "phone": user.phone,
        "country": user.country,
        "region": user.region,
        "city": user.city,
        "adress": user.adress,
        "description": user.description,
        "Organisation": user.Organisation,
        "birthDay": user.birthDay,
        "dateCreation": user.dateCreation
      };

      this.api.post('api/auth/signup', body, headers)
        .subscribe((response: any) => {
          if (response) {
            console.log('resp msg: ', response);
            this.registResult = true;
            resolve(response);
          }
        }), error => {
          console.log('Error message: ', JSON.stringify(error));
          this.registResult = false;
          console.log('Error message: ', error.message);
          reject(error);
        };
    });
  }


  /**
   *  Get authentification status
   */
  getAuthStatus(authStatus: any) {
    if (authStatus == 'true') {
      this.authStatus = true;
    } else {
      this.authStatus = false;
    }

  }

  // Login into your account
  authLogin(email, password): Promise<any> {

    const param = {
      'email': email,
      'password': password,
    };
    const header = {
      'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    };


    return new Promise((resolve, reject) => {
      this.api.post('api/auth/login', param, header)
        .subscribe({
          next: (response) => {
            this.currentUserSubject.next(response.user);
            // const profilePicture = response.data.user.profilePicture;
            // const words = profilePicture.split('yabain.com/');
            // response.data.user.profilePicture = words[1];

            // this.webStorage.Login(response.userId);
            this.setAccessToken(response.token);
            console.log('User infos: ', response);
            // this.router.navigate(['/dashboard/home']);
            this.user.setUserInformations(response.user)
            resolve(response);
            return response.user;
          },
          error: (error) => {
            if (error.status == 500) {
              this.registResult = false;
              console.log("Error server", error);
              reject(error);
            } else if (error.error.statusCode == 403) {
              this.registResult = false;
              console.log("Email address not verified. Check your email.", error);
              reject(error);
            } else if (error.error.statusCode == 401) {
              this.registResult = false;
              console.log("Incorrect email or password! Please verify your information.", error);
              reject(error);
            } else {
              // this.toastr.error(error.message, 'Error');
              reject(error);

            }

          }
        });
    });
  }

  // Set the user access token.
  setAccessToken(token: string) {
    return localStorage.setItem('token', token);
  }

  // Get the user access token.
  getAccessToken() {
    return localStorage.getItem('token');
  }
  // verify Email
  verifyEmail(token?: string) {
    const param = {
    };
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    };
    if (token) {
      return new Promise((resolve, reject) => {
        this.api.post('email/confirm', param, header)
          .subscribe(response => {
            // this.toastr.success('Your email has been verified.', 'Success');
            this.router.navigateByUrl('/login');
            resolve(response);
          }, error => {
            console.log('erreur: ', error)

            if (error.status == 401) {
              // this.toastr.error("Your verification email has expired.", 'Error');

            }
            else if (error.status == 404) {
              // this.toastr.error("User not found.");

            }
            else if (error.status == 403) {
              // this.toastr.error("The email has already been confirmed.", 'Error');

            }
            else if (error.status == 500) {
              // this.toastr.error("Internal Server Error.", 'Error');

            } else {
              // this.toastr.error(error, 'Error');
            }
            reject(error);
          });
      })
    }
  }

  /**
   *  Get the user informations
   */
  authUserInformations(): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };


      this.api.get('requester/profil', headers)
        .subscribe((reponse: any) => {
          if (reponse) {
            resolve(reponse);
            this.user.setUserInformations(reponse);
          }

        }, (error: any) => {

          if (error) {
            // this.toastr.success(error.message, 'Success');
            reject(error);
          }
        });
    });

  }
}
