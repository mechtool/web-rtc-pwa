import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../../classes/Classes";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

    @Input() public context : Contact;
    
  constructor() { }

  ngOnInit() {
  }

}
