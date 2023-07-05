import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ContactService } from '../../contact.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormBuilder
} from '@angular/forms';
// import { Contact } from '../../contact.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { LocationService } from 'src/app/shared/service/location/location.service';
import { Contact } from 'src/app/shared/entities/contact/contact';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  contactForm: UntypedFormGroup;
  contact: Contact;
  region: any = [];
  city: any = [];
  
  constructor(
    private location: LocationService,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contactService: ContactService,
    private fb: UntypedFormBuilder,
    private formLog: FormBuilder,
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle =
        data.contact.firstName + ' ' + data.contact.lastName;
      this.contact = data.contact;
    } else {
      this.dialogTitle = 'Contact';
      this.contact = new Contact({});
    }
    this.contactForm = this.createContactForm();
  }
  
  ngOnInit() {
    this.region = this.location.region();
  }

  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  createContactForm(): UntypedFormGroup {
    if (this.contact.country == 'Cameroon') {
      this.contact.country = '1'
    } else if (this.contact.country == 'Congo') {
      this.contact.country = '2'
    } else if (this.contact.country == 'Gabon') {
      this.contact.country = '3'
    } else if (this.contact.country == 'EqGuinee') {
      this.contact.country = '4'
    }

    return this.fb.group({
      id: [this.contact.id],
      img: [this.contact.img],
      firstName: [this.contact.firstName, [Validators.required]],
      lastName: [this.contact.lastName, [Validators.required]],
      email: [
        this.contact.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      gender: [this.contact.gender],
      birthday: [
        formatDate(this.contact.birthday, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ],
      address: [this.contact.address],
      phone: [this.contact.phone, [Validators.required]],
      country: [this.contact.country],
      // region: [this.contact.region],
      city: [this.contact.city],
      about: [this.contact.about],
      creationDate: [this.contact.creationDate]
    });
  }

  submit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  
  onSelect(region: any) {
    console.log('les villes: ', this.location.city(),region)
    this.city = this.location.city()
      .filter(e =>
        e.id == region.value);
  }

  public confirmAdd(): void {
    this.contact = this.contactForm.getRawValue();
    if (this.contact.country == '1') {
      this.contact.country = 'Cameroon'
    } else if (this.contact.country == '2') {
      this.contact.country = 'Congo'
    } else if (this.contact.country == '3') {
      this.contact.country = 'Gabon'
    } else if (this.contact.country == '4') {
      this.contact.country = 'EqGuinee'
    }
    this.contactService.addContact(
      this.contact
    );
    console.log('valeur du formulaire: ', this.contact)
  }
}
