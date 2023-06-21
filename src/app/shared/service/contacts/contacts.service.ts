import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { Contact } from '../../entities/contact/contact';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  public currentContact: Contact = new Contact();

  currentContactSubject: Subject<Contact> = new Subject<Contact>();
  public static isContact = true;

  listContact: Contact[] = [];

  params: any;
  contactData: any;

  constructor(
    private api: ApiService,
    private keycloakService: KeycloakService
  ) { }

  getOneContactToList(contactId: string, contactList: []) {
  }

  getAllContacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get('contact')
        .subscribe(result => {
          console.log("Get all contact: ", result);
          let tab: any = result;
          localStorage.setItem("contact-list", JSON.stringify(tab));
          resolve(result);
          return 0;
        }, error => {
          reject(error);
        });
    });
  }

  addContact(contact): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return new Promise((resolve, reject) => {
      this.api.post(`contacts`, contact)
        .subscribe((response: any) => {
          resolve(response);
        }, (error: any) => {
          reject(error);
        });
    })
  }

  deleteContact(contactId): Promise<any> {
    
    const param = {
      'id': contactId,
    };

    return new Promise((resolve, reject) => {
      this.api.delete('contact', param)
        .subscribe(response => {
          console.log('Contact deleted: ', response)
          setTimeout(() => {
          }, 3000);
          resolve(response);
        }, error => {
          reject(error);
        });
    });

  }

  updateContact(contact): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.put(`contact/${contact.id}`, contact)
        .subscribe((response: any) => {
          resolve(response);
        }, (error: any) => {
          reject(error);
        });
    })
  }

  //recuperer les informations d'un utilisateur
  getContactById(id: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let contact: Contact = this.listContact.find((u) => u.id == id);
      if (contact != undefined) resolve(contact);
      else {
        this.api.get(`contact/${id}`)
          .subscribe(success => {
            if (success) {
              // console.log("Success ",success)
              if (success.resultCode == 0) {
                resolve(this.parseDataFromApi(success.result));
              }
              else reject(success)

            }
            else reject(success)
          }, error => {
            reject(error);
          })
      }
    })
  }

  parseDataFromApi(contactApiData: Record<string | number, any>): Contact {
    let contact: Contact = new Contact();
    contact.id = contactApiData._id;
    contact.firstName = contactApiData.firstName;
    contact.lastName = contactApiData.lastName;
    contact.email = contactApiData.email;
    contact.phoneNumber = contactApiData.phoneNumber;
    contact.profilePicture = contactApiData.profilePicture;
    contact.dateCreation = contactApiData.createdAt;
    contact.country = contactApiData.country;
    contact.city = contactApiData.location;
    contact.adress = contactApiData.address;
    contact.description = contactApiData.bio;
    return contact;
  }

}
