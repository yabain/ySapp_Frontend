import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
// import { Contact } from './contact.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../../UnsubscribeOnDestroyAdapter';
import { Contact } from '../../entities/contact/contact';
// import { ContactsService } from './contacts.service';
import { ApiService } from '../api/api.service';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class ContactService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/advanceTable.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Contact[]> = new BehaviorSubject<
    Contact[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  currentContactSubject: Subject<Contact> = new Subject<Contact>();
  public static isContact = true;
  contactList: Contact[];
  params: any;
  contactData: any;

  constructor(
    private httpClient: HttpClient,
    // private contactsService?: ContactsService,
    private api?: ApiService,
    private keycloakService?: KeycloakService) {
    super();
  }

  get data(): Contact[] {
    console.log('datas: ', this.dataChange.value);
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  refreshContacts() {}

  getContactsForGroup(groupId: string){}

  /** CRUD METHODS */
  getAllContacts(): void {
    this.isTblLoading = true;
    let allContacts: Contact[] = JSON.parse(localStorage.getItem('contact-list'));
    this.subs.sink = this.httpClient
      .get<Contact[]>(this.API_URL)
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(allContacts);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }

  addContact(contact: Contact): void {

    // this.contactsService.addContact(contact)
    //   .then((response) => {
    //     console.log(response);
    //     localStorage.setItem('response', JSON.stringify(response));
    //     this.dialogData = contact;
    //   })
    //   .catch((error) => {
    //     localStorage.setItem('error du backend', error);
    //     console.log(error);
    //   });


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

  parseDataFromApi(contactApiData: Record<string | number, any>): Contact {
    let contact: Contact = new Contact(contactApiData);
    contact.id = contactApiData._id;
    contact.firstName = contactApiData.firstName;
    contact.lastName = contactApiData.lastName;
    contact.email = contactApiData.email;
    contact.gender = contactApiData.gender;
    contact.phone = contactApiData.phoneNumber;
    contact.img = contactApiData.profilePicture || 'assets/images/user/user.png';
    contact.creationDate = contactApiData.createdAt;
    contact.country = contactApiData.country;
    contact.skype = contactApiData.skype;
    contact.whatsapp = contactApiData.whatsappContact;
    contact.city = contactApiData.city;
    contact.address = contactApiData.address;
    contact.about = contactApiData.about;
    contact.birthday = contactApiData.birthday;
    return contact;
  }

  parseDataForApi(contactApiData) {
    console.log('contactApiData: ', contactApiData)
    let contact: any = {
      firstName: contactApiData.firstName,
      lastName: contactApiData.lastName,
      email: contactApiData.email,
      phoneNumber: contactApiData.phone,
      whatsappContact: contactApiData.phone,
      // profilePicture: contactApiData.img,
      // createdAt: contactApiData.creationDate,
      country: contactApiData.country,
      city: contactApiData.city,
      skype: contactApiData.skype,
      birthday: contactApiData.birthday,
      address: contactApiData.address,
      about: contactApiData.about,
      gender: contactApiData.gender
    }
    console.log('contact: ', contact)
    return contact;
  }

}
