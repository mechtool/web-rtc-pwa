import {AfterViewInit, Component, OnDestroy, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Contact } from "../../classes/Classes";
import {ContentPageComponent} from "../content-page/content-page.component";
import {DatabaseService} from "../../services/database.service";


@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent implements OnInit, AfterViewInit, OnDestroy {

    public accordionAnimation = true;
    public contacts : Contact[];
    public componentSubscriptions = [];
    
    public contactForm = new FormGroup({
	contactsControl : new FormControl('', [Validators.required])
    });
    
    constructor(
      public databaseService : DatabaseService,
      @Optional() public content : ContentPageComponent) {
	this.componentSubscriptions.push(this.content.contacts.subscribe(resp => {
	    debugger;
	     this.contacts = resp;
	}));
  }
    
    onClickSearch(){
	this.databaseService.searchContact(this.contactForm.value.contactsControl).subscribe(resp  => {
	    debugger;
	    let cont =  resp;
	    this.content.contacts.next();
	}, err =>{})
    }
    ngOnInit(){
    }
    ngOnDestroy(){
        this.componentSubscriptions.forEach(sub => {
            sub.unsubscribe()
	})
    }
    
    ngAfterViewInit(){
	this.accordionAnimation = false;
    }
  
}
