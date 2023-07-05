import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MessageWSService } from './shared/service/message/message-ws.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUrl: string;
  constructor(public _router: Router, location: PlatformLocation,private http: HttpClient,private messageWsService:MessageWSService) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        location.onPopState(() => {
          window.location.reload();
        });
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      window.scrollTo(0, 0);
    });
  }
  ngOnInit(): void {
    // this.http.get("http://localhost:3000/user").subscribe((value)=>{
    //   console.log("User ",value);
    // });
  }



  
}
