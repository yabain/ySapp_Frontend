import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ErrorsService } from '../errors/errors.service';
import { AuthService } from "./../auth/auth.service"
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class MessageWSService {

  qrCodeSubject:BehaviorSubject<any>=new BehaviorSubject<any>(null)
  constructor(
    private apiService: ApiService,
    private authService:AuthService,
    private socket:Socket
  ) {
    this.socket.emit("connexion",this.authService.currentUser.getValue().email)
    this.socket.on("qrcode",(data)=>this.receiveQrCode(data))
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
    
  }

  sendMessageToMultipleGroup(groupIdList: [], message) {
    
  }

  receiveQrCode(qrCode)
  {
    this.qrCodeSubject.next(qrCode)
  }

  

}
