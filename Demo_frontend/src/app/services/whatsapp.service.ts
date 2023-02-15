import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WhatsappModel } from '../models/whatsapp.model';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(private http:HttpClient) { }


  envoieMessage(message:WhatsappModel){

    return this.http.post('http://localhost:3001/lead', message);

  }


}
