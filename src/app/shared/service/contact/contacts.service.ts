import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Contact } from '../../entities/contact/contact';
import { NotificationsService } from '../notifications/notifications.service';
import { DatePipe, formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  currentContactSubject: Subject<Contact> = new Subject<Contact>();
  public static isContact = true;
  listContact: Contact[] = [];
  params: any;

  constructor(
    private api?: ApiService,
    private notificationsService?: NotificationsService,
    private datePipe?: DatePipe,
  ) { }

  getOneContactToList(contactId: string, contactList: []) {
  }

  getAllContacts(): Promise<any> {
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.get('contacts')
        .subscribe(result => {
          console.log("Get all contact: ", result.data);
          let tab: any = result.data;
          for (let i = 0; i < tab.length; i++) {
            tab[i] = this.parseDataFromApi(tab[i]);
          }
          localStorage.setItem("contact-list", JSON.stringify(tab));
          resolve(result);
        }, error => {
          reject(error);
        });
    });
  }

  addContact(contact): Promise<any> {
    let contactId = contact.id;

    let d = new Date();
    let date = this.datePipe.transform(d, 'yyyy');
    let date2 = this.datePipe.transform(contact.birthday, 'yyyy');
    console.log('date: ', date);
    console.log('birthday: ', date2);
    if(date == date2) {
      contact.birthday = undefined;
      console.log('new date undifined: ', contact.birthday);
    }
    console.log('new date: ', contact.birthday);


    contact = this.parseDataForApi(contact);
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.post(`contacts`, contact)
        .subscribe((response: any) => {
          this.notificationsService.dialogShowCustomPosition('Contact added', 'success', 3000);
          resolve(response);
        }, (error: any) => {
          let update = RegExp('\\b'+ 'duplicate key error' +'\\b').test(JSON.stringify(error));
          if (update){
            this.api.put('contacts/' + contactId, contact)
            .subscribe((data: any) => {
              this.notificationsService.dialogShowCustomPosition('Contact updated', 'success', 3000);
              resolve(data);
            }, error => {
              this.notificationsService.showNotification('Can not update contact, please try again.', 'danger', 7000);
              reject(error)});
          } else {
          this.notificationsService.showNotification('Can not add contact, please try again.', 'danger', 7000);
          console.log('le message', JSON.stringify(error));
          reject(error);}
        });
    })
  }

  deleteContact(contactId): Promise<any> {
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.delete(`contacts/${contactId}`)
        .subscribe(response => {
          this.notificationsService.dialogShowCustomPosition('Contact delete', 'success', 3000);
          // setTimeout(() => {
          // }, 3000);
          resolve(response);
        }, error => {
          this.notificationsService.showNotification('Can not delete contact.', 'danger', 3000);
          setTimeout(() => {
            this.notificationsService.showNotification('This fonction is not ready yet. Please try again later.', 'warning', 5000)
          }, 3000);
          reject(error);
        });
    });

  }

  updateContact(contact): Promise<any> {
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
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
  // getContactById(id: String): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     let contact: Contact = this.listContact.find((u) => u.id == id);
  //     if (contact != undefined) resolve(contact);
  //     else {
  //       this.api.get(`contact/${id}`)
  //         .subscribe(success => {
  //           if (success) {
  //             if (success.resultCode == 0) {
  //               resolve(this.parseDataFromApi(success.result));
  //             }
  //             else reject(success)

  //           }
  //           else reject(success)
  //         }, error => {
  //           reject(error);
  //         })
  //     }
  //   })
  // }

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
    contact.groups = contactApiData.groups;
    contact.about = contactApiData.about;
    contact.birthday = contactApiData.birthday;
    return contact;
  }


  parseDataForApi(contactApiData) {
    // console.log('contactApiData: ', contactApiData)
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
