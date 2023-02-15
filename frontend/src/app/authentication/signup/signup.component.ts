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
    this.region = this.location.region();
    this.storage.Checkuser();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['',[Validators.minLength(8)]],
      gender: ['', Validators.required],
      phone: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^6[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$'), Validators.required]],
      country: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  onSelect(region: any) {
    this.city = this.location.city()
      .filter(e =>
        e.id == region.target.value);
  }

  get f() {
    return this.registerForm.controls;
  }
  
  onSubmit() {
    console.log('form soumis1: ', this.registerForm)
    if (this.registerForm.invalid) {
      return;
    } else {
      console.log('form soumis2: ', this.registerForm)
      this.submitted = true;

      if (this.registerForm.value.region === '1') {
        this.registerForm.value.region = 'Adamaoua'
      } else if (this.registerForm.value.region === '2') {
        this.registerForm.value.region = 'Centre'
      } else if (this.registerForm.value.region === '3') {
        this.registerForm.value.region = 'Est'
      } else if (this.registerForm.value.region === '4') {
        this.registerForm.value.region = 'Guinée équatoriale'
      } else if (this.registerForm.value.region === '5') {
        this.registerForm.value.region = 'Extreme-nord'
      } else if (this.registerForm.value.region === '6') {
        this.registerForm.value.region = 'Littoral'
      } else if (this.registerForm.value.region === '7') {
        this.registerForm.value.region = 'Nord-ouest'
      } else if (this.registerForm.value.region === '8') {
        this.registerForm.value.region = 'Ouest'
      } else if (this.registerForm.value.region === '9') {
        this.registerForm.value.region = 'Sud'
      } else if (this.registerForm.value.region === '10') {
        this.registerForm.value.region = 'sud-ouest'
      }
      
      let user = new User();
      user.hydrate(this.registerForm.value);
      // this.navigateToSigninPage();
  
      this.authService.createAccount(this.registerForm.value)
      .then((result) => {
        console.log('redirection vers login...')
        this.submitted = false;
        this.router.navigate(['/authentication/signin']);
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.submitted = false;
      });
    }
  }
}
