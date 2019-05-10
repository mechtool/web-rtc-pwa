import {AfterViewInit, Component, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import { Contact } from "../../classes/Classes";
import {HttpClient} from "@angular/common/http";
import {ContentPageComponent} from "../content-page/content-page.component";
import {AppComponent} from "../../app.component";


@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent implements OnInit, AfterViewInit {

    public accordionAnimation = true;
    public contacts : Subject<Contact[]>;
    public contactForm = new FormGroup({
	contactsControl : new FormControl('', [Validators.required])
    });
  constructor(
      private http : HttpClient,
      @Optional() public content : ContentPageComponent) {
      
      		this.contacts = this.content.contacts
  }
    
    onClickSearch(){
   /*      this.appContacts = this.http.get('/get-contacts').pipe(
	     map((value : []) => {
	         return value.filter(elem => new Contact());
	     })
	 )*/
    }
    ngOnInit(){
       debugger;
    }
    
    ngAfterViewInit(){
	this.accordionAnimation = false;
    }
  
}
