import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AuthService } from "./../auth/auth.service"
import { BehaviorSubject,  } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { NotificationsService } from '../notifications/notifications.service';


@Injectable()
export class MessageWSService {

  qrCodeSubject:BehaviorSubject<any>=new BehaviorSubject(null)
  
  constructor(
    private apiService: ApiService,
    private authService:AuthService,
    private notificationService:NotificationsService,
    private socket:Socket
  ) {
      this.authService.isAuthenticatedSubject.subscribe((value)=>{
      if(value) this.socket.emit("connexion",{email:this.authService.currentUser.getValue().email})
    })
    
    this.socket.on("qrcode",(data)=>this.receiveQrCode(data))
    this.socket.on("connected",(data)=>{
      this.notificationService.showNotification("WhatsApp Sync Successfully","success");
      //doit mettre un attribut pour spécifier que whatsapp a été synchronisé. peut-être: localstorage?
    })

    this.socket.on("disconnected",(data)=>{
      this.notificationService.showNotification("WhatsApp Disconnected","danger");
      //doit mettre un attribut pour spécifier que whatsapp a été synchronisé. peut-être: localstorage?
    })
 

  }

  sendMessageToUser(id, message, type?, isSentToNow?, dateToSend?) {
    return new Promise((resolve, reject) => {
      let params = {
        'contactsID': id,
        'type': type === undefined? 'text' : type,
        'isSentToNow': isSentToNow === undefined? true : isSentToNow,
        'dateToSend': isSentToNow === true? undefined : dateToSend,
         email:this.authService.currentUser.getValue().email,
        'body': {
          'text': message
        }
      };
      let refNotif=this.notificationService.showNotificationWitouhTimer('Pending.....', 'info')
      console.log("Message ",params)
      this.socket.emit("send-message",params);
      this.socket.once("send-message",(data)=>{
        refNotif.dismiss()
        if(data) 
        {          
          this.notificationService.showNotification("WhatsApp message send successfully","success");
          resolve(true)
        }
        else 
        {
          this.notificationService.showNotification("Error when sending message! please try again","danger");
          resolve(false)
        }
      })
    })
  }

  sendMessageToGroup(groupContact: [], message) {
    return new Promise((resolve, reject) => {
      
    })
  }

  sendMessageToOneGroup(groupId, message) {
    
  }

  sendMessageToMultipleGroup(groupIdList: [], message) {
    
  }

  receiveQrCode(qrCode)
  {
    console.log("QrCode ",qrCode)
    this.qrCodeSubject.next(qrCode)
  }

  

}
