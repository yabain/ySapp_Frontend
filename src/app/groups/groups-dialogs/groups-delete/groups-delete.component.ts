import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LocationService } from 'src/app/shared/service/location/location.service';
import { Group } from 'src/app/shared/entities/group/group';
import { GroupsService } from 'src/app/shared/service/groups/groups.service';

@Component({
  selector: 'app-groups-delete',
  templateUrl: './groups-delete.component.html',
  styleUrls: ['./groups-delete.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class GroupsDeleteComponent implements OnInit {
  action: string;
  dialogTitle: string;
  deleteForm: UntypedFormGroup;
  group: Group;
  groupList = JSON.parse(localStorage.getItem('groups-list'));
  region: any = [];
  city: any = [];
  
  constructor(
    private location: LocationService,
    public dialogRef: MatDialogRef<GroupsDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public groupService: GroupsService,
    private fb: UntypedFormBuilder,
  ) {
    // Set the defaults
    // this.action = data.action;
    // if (this.action === 'edit') {
      this.dialogTitle = data.group.name
      this.group = data.group;
      console.log('data: ', data);
    // } else {
    //   this.dialogTitle = 'Add group';
    //   this.group = new Group({});
    // }

    this.deleteForm = this.createGroupForm();
  }
  
  ngOnInit() {
  }

  formControl = new UntypedFormControl('', [
    Validators.required
  ]);

  createGroupForm(): UntypedFormGroup {
    return this.fb.group({
      idGroup: [this.group.id, Validators.required],
      idGroupToTransfert: ['', Validators.required],
    });
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteGroup(): void {
    let deleteForm = this.deleteForm.getRawValue();
    console.log('valeur du formulaire: ', deleteForm);
    this.groupService.deleteGroup(deleteForm.idGroup, deleteForm.idGroupToTransfert);
  }
  
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

}
