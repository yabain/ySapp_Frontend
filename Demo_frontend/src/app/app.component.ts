import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { WhatsappService } from './services/whatsapp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ySapp for Whatsapp';
  messageForm:any;

  respuest:any={};

  constructor(private whatsappSvc:WhatsappService, private fb:FormBuilder) {

    this.messageForm = fb.group({
    
      phone:['', [Validators.required]],
      message:['', [Validators.required]],


    })  

  }

  envoieWhatsapp(){

    if (this.messageForm.value.phone && this.messageForm.value.message ) {
     
      let mensaje={

        message:this.messageForm.value.message,
        phone:this.messageForm.value.phone
      }
  
      this.whatsappSvc.envoieMessage(mensaje).subscribe(res=>{

        this.respuest = res
        console.log(this.respuest.responseExSave.error)
        
        if (this.respuest.responseExSave.error === 'WAIT_LOGIN') {
          Swal.fire('ERROR', 'Vous devez scanner le code QR', 'error');              
        }else if(this.respuest.responseExSave.error === 'Protocol error (Runtime.callFunctionOn): Session closed. Most likely the page has been closed.'){
         
         Swal.fire('ERROR', 'La session est déconnectée', 'error');
         this.messageForm.reset();

        }else{
         Swal.fire('Exito', 'Message envoyé', 'success');
         this.messageForm.reset();
        }

      })
  
      
    }else{


      Swal.fire('ERROR', 'Vous devez remplir tous les champs', 'error');


    }  
    

  }






}
