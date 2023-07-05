import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ErrorsService } from '../errors/errors.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private apiService: ApiService,
    private errorsService: ErrorsService
  ) {
  }

  sendMessageToSigleUser(id, message) {
    return new Promise((resolve, reject) => {
      let params = {
        'id': id,
        'message': message
      };
      this.apiService.post(`message/post`, JSON.stringify(params))
        .subscribe(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
    })
  }

  sendMessageToMultipleUser(groupContact: [], message) {
    return new Promise((resolve, reject) => {
      let params = {
        'contactList': groupContact,
        'message': message
      };
      this.apiService.post(`message/post`, JSON.stringify(params))
        .subscribe(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
    })
  }

  sendMessageToOneGroup(groupId, message) {
    return new Promise((resolve, reject) => {
      let params = {
        'contactList': groupId,
        'message': message
      };
      this.apiService.post(`message/post`, JSON.stringify(params))
        .subscribe(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
    })
  }

  sendMessageToMultipleGroup(groupIdList: [], message) {
    return new Promise((resolve, reject) => {
      let params = {
        'groupIdList': groupIdList,
        'message': message
      };
      this.apiService.post(`message/post`, JSON.stringify(params))
        .subscribe(success => {
          resolve(success);
        }, error => {
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
