import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }
    
    //модулю приложения
    private communicateSubject = new Subject<any>();
    public communicateObservable = this.communicateSubject.asObservable();
    sendResource(resource){
	this.communicateSubject.next(resource);
    }
}
