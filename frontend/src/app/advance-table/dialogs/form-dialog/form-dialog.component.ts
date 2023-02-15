import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AdvanceTableService } from '../../advance-table.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { AdvanceTable } from '../../advance-table.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { LocationService } from 'src/app/shared/service/location/location.service';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  advanceTableForm: UntypedFormGroup;
  advanceTable: AdvanceTable;
  region: any = [];
  city: any = [];
  
  constructor(
    private location: LocationService,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceTableService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle =
        data.advanceTable.firstName + ' ' + data.advanceTable.lastName;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = 'Contact';
      this.advanceTable = new AdvanceTable({});
    }
    this.advanceTableForm = this.createContactForm();
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
    return this.fb.group({
      id: [this.advanceTable.id],
      img: [this.advanceTable.img],
      firstName: [this.advanceTable.firstName, [Validators.required]],
      lastName: [this.advanceTable.lastName, [Validators.required]],
      email: [
        this.advanceTable.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      gender: [this.advanceTable.gender],
      birthday: [
        formatDate(this.advanceTable.birthday, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ],
      address: [this.advanceTable.address],
      phone: [this.advanceTable.phone, [Validators.required]],
      country: [this.advanceTable.country],
      region: [this.advanceTable.region],
      city: [this.advanceTable.city],
      about: [this.advanceTable.about]
    });
  }
  submit() {
    // emppty stuff
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
    this.advanceTableService.addAdvanceTable(
      this.advanceTableForm.getRawValue()
    );
    console.log('valeur du formulaire: ', this.advanceTable = this.advanceTableForm.getRawValue())
  }
}
