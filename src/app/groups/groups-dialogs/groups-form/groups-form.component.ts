import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormBuilder
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LocationService } from 'src/app/shared/service/location/location.service';
import { Group } from 'src/app/shared/entities/group/group';
import { GroupsService } from 'src/app/shared/service/groups/groups.service';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class GroupsFormComponent implements OnInit {
  action: string;
  dialogTitle: string;
  groupForm: UntypedFormGroup;
  group: Group;
  region: any = [];
  city: any = [];
  
  constructor(
    private location: LocationService,
    public dialogRef: MatDialogRef<GroupsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public groupService: GroupsService,
    private fb: UntypedFormBuilder,
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.group.name
      this.group = data.group;
      console.log('data: ', data);
    } else {
      this.dialogTitle = 'Add group';
      this.group = new Group({});
    }
    this.groupForm = this.createGroupForm();
  }
  
  ngOnInit() {
  }

  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);

  createGroupForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.group.id],
      profilePicture: [],
      name: [this.group.name, [Validators.required]],
      description: [this.group.description, [Validators.required]],
    });
  }
  
  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.group = this.groupForm.getRawValue();
    if (this.action === 'edit') {
    this.groupService.updateGroup(this.group)
    .then((result) => {
      localStorage.setItem('groups-list', JSON.stringify(result));
    });
    } else {
      this.groupService.addGroup(this.group);
    }
    console.log('valeur du formulaire: ', this.group);
  }
}
