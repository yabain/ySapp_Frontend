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

  sendMessageSigleUser(id, message) {
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

  getQrCode(): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      this.apiService.get2('message/qr-code')
        .subscribe(result => {
          console.log(result);
          resolve (result);
        }, error => {
          console.log("Erreur get QR-code: ", error);
          this.errorsService.errorsInformations(error, 'get QR-code');
          reject (error);
        })
    })
  }

}
