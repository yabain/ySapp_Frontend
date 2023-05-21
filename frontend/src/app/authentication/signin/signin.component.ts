import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;
  error = '';
  hide = true;
  holdEmail = 'admin@lorax.com';
  holdPwd = 'admin';

  constructor(
    private authService: AuthService,
  ) {
    super();
    if (this.authService.reload == 0){
      // window.location.reload();
      this.authService.reload = 1;
    }
  }
  ngOnInit() {
    
  }


  login() {
    this.authService.authLogin()
  }
}