import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { ContactsService } from '../shared/service/contacts/contacts.service';


@Injectable()
export class ContactService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/advanceTable.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Contact[]> = new BehaviorSubject<
    Contact[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(
    private httpClient: HttpClient,
    private contactsService?: ContactsService) {
    super();
  }
  get data(): Contact[] {
    console.log('datas: ', this.dataChange.value);
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllContacts(): void {
    this.subs.sink = this.httpClient
      .get<Contact[]>(this.API_URL)
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  
  addContact(contact: Contact): void {

    this.contactsService.addContact(contact)
    .then((response) => {
      console.log(response);
      localStorage.setItem('response', JSON.stringify(response));
      this.dialogData = contact;
    })
      .catch((error) => {
        localStorage.setItem('error du backend', error);
        console.log(error);
      }); 


    /*  this.httpClient.post(this.API_URL, advanceTable).subscribe(data => {
      this.dialogData = advanceTable;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateContact(advanceTable: Contact): void {
    this.dialogData = advanceTable;

    /* this.httpClient.put(this.API_URL + advanceTable.id, advanceTable).subscribe(data => {
      this.dialogData = advanceTable;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteContact(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
