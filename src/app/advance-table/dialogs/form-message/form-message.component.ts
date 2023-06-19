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
import { WhatsappService } from 'src/app/shared/service/whatsapp/whatsapp.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormMessageComponent implements OnInit {
  action: string;
  dialogTitle: string;
  advanceTableForm: UntypedFormGroup;
  advanceTable: AdvanceTable;
  region: any = [];
  city: any = [];
  respuest:any={};
  
  constructor(
    private location: LocationService,
    public dialogRef: MatDialogRef<FormMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: AdvanceTableService,
    private fb: UntypedFormBuilder,
    private whatsappService: WhatsappService,
    private snackBar: MatSnackBar
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
      email: [
        this.advanceTable.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      phone: ['237'+this.advanceTable.phone, [Validators.required]],
      message: ['', [Validators.required]],
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

  public sendMessage(): void {
    let messageForm = this.advanceTableForm.getRawValue();
    this.whatsappService.envoieMessage(messageForm)
    .subscribe(res=>{
      // console.log(res);

      this.respuest = res
      // console.log('RESPONSE: ', this.respuest.responseExSave);
      
      if (this.respuest.responseExSave.error === 'WAIT_LOGIN') {
        this.showNotification(
          'snackbar-danger',
          'Vous devez scanner le code QR.',
          'bottom',
          'center'
        );
      }else if(
        this.respuest.responseExSave.error === 'Protocol error (Runtime.callFunctionOn): Session closed. Most likely the page has been closed.'){
       
        this.showNotification(
          'snackbar-danger',
          'La session est déconnectée',
          'bottom',
          'center'
        );

      }
      else{
        this.showNotification(
          'snackbar-success',
          'Message sended',
          'bottom',
          'center'
        );
      //  this.messageForm.reset();
      }

    })
  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}
