import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ErrorsService } from '../errors/errors.service';
import { NotificationsService } from '../notifications/notifications.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private apiService: ApiService,
    private errorsService: ErrorsService,
    private notificationsService: NotificationsService
  ) {
  }

  sendMessageToUser(id, message, type?, isSentToNow?, dateToSend?): Promise<any> {
    console.log("sendMessageToUse", id)
    return new Promise((resolve, reject) => {
      let params = {
        'contactsID': id,
        'type': type === undefined? 'text' : type,
        'isSentToNow': isSentToNow === undefined? true : isSentToNow,
        'dateToSend': isSentToNow === true? undefined : dateToSend,
        'body': {
          'text': message
        }
      };
      this.apiService.post(`message/post`, JSON.stringify(params))
        .subscribe(success => {
          this.notificationsService.dialogShowCustomPosition('Message sent', 'success', 3000);
          resolve(success);
        }, error => {
          this.notificationsService.showNotification('Can not send message, please try again later.', 'danger', 7000);
          reject(error);
        });
    })
  }

  sendMessageToGroup(groupContact, message, type?, isSentToNow?, dateToSend?): Promise<any> {
    console.log("sendMessageToGroup", groupContact)
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      let params = {
        'groupsID': groupContact,
        'type': type === undefined? 'text' : type,
        'isSentToNow': isSentToNow === undefined? true : isSentToNow,
        'dateToSend': isSentToNow === true? undefined : dateToSend,
        'body': {
          'text': message
        }
      };
      this.apiService.post(`message/post`, JSON.stringify(params))
        .subscribe(success => {
          this.notificationsService.dialogShowCustomPosition('Message sent', 'success', 3000);
          resolve(success);
        }, error => {
          this.notificationsService.showNotification('Can not send message, please try again later.', 'danger', 7000);
          reject(error);
        });
    })
  }

  getQrCode(): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      this.apiService.get('message/qr-code')
        .subscribe(result => {
          localStorage.setItem('qrCode', JSON.stringify(result));
          console.log(result);
          resolve (result);
        }, error => {
          console.log("Erreur get QR-code: ", error);
          this.errorsService.errorsInformations(error, 'get QR-code');
          reject (error);
        })
    })
  }

  recordFromCalendar(record): Promise<any> {
    return new Promise((resolve, reject) => {
    const params = {
      'groupId': record.groupId,
      'date': record.date,
      'object': record.object,
      'message': record.message
    }
    this.apiService.post('message/record', params)
      .subscribe(result => {
        console.log(result);
        resolve (result);
      }, error => {
        reject (error);
      })
  });
  }

}
