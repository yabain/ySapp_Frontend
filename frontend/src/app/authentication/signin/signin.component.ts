import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
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
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    super();
    if (this.authService.reload == 0){
      // window.location.reload();
      this.authService.reload = 1;
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.authService.authLogin(this.f.email.value, this.f.password.value)
        .then((res) => {
          console.log('000')
          console.log('token: ', this.authService.getAccessToken());
          this.router.navigate(['/dashboard/main']);
          console.log('redirection')
          this.submitted = false;
          this.authService.reload = 0;
          // this.router.navigate(['/dashboard/main']);
        })
        .catch((error) => {
          console.log('111')
          // console.error('Erreur: ', error.message);
          // this.submitted = false;
        });
    }
  }
}