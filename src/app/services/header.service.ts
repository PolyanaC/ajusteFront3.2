import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  sendMessage = new Subject();
 
  constructor() { }

  communicateMessage(message){
    this.sendMessage.next(message);
  }

}
