import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WhatsappModel } from '../../models/whatsapp/whatsapp.model';

@Injectable({
  providedIn: 'root'
})

export class WhatsappService {
  public urlToSendMessage = environment.urlToSendMessage;

  constructor(private http:HttpClient) { }

  envoieMessage(message:WhatsappModel){

    return this.http.post(this.urlToSendMessage + '/lead', message);

  }


}
