import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { YEntityID } from 'src/app/shared/entities';
import { User } from '../../entities/user/user';



@Injectable({
  providedIn: 'root'
})
export class UserProfilService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(
    ) {

  }
  setUser(user:User):void
  {
    this.currentUser.next(user);
  }
    /*
   * resetPassword is used to reset your password.
   */
    resetPassword() {
    }

    getCurrentUserProfil(userID:YEntityID)
    {
    }

    resetDataUser(user:User)
    {
      
    }

    saveUserProfil(user:User)
    {
    }

}
