import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/shared/service/location/location.service';
import { WebStorage } from 'src/app/shared/service/storage/web.storage';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/entities/user/user';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: UntypedFormGroup;
  submitted = false;
  hide = true;
  chide = true;
  region: any = [];
  city: any = [];

  public subscription: Subscription;
  public CustomControler: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: LocationService,
    private storage: WebStorage,
    private authService: AuthService,
  ) {
    this.subscription = this.storage.Createaccountvalue.subscribe((data) => {
      this.CustomControler = data;
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn()
      .then(response => {
        if (response === true) {
          this.router.navigate(['/dashboard']);
          setTimeout(() => { location.reload() }, 700);
        } else {
          localStorage.clear();
        }
      }
      )
  }

  login() {
    this.authService.authLogin()
  }
}
