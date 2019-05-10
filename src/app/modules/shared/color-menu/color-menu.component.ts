import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay";
import {CommunicationService} from "../../../services/communication.service";

@Component({
  selector: 'app-color-menu',
  templateUrl: './color-menu.component.html',
  styleUrls: ['./color-menu.component.css']
})
export class ColorMenuComponent implements OnInit {
    
    public colorItems = [
	{colorClass : 'first-theme', color : 'rgb(255, 214, 0)', active : false},
	{colorClass : 'second-theme', color : 'rgb(30, 136, 229)', active : true},
	{colorClass : 'third-theme', color : 'rgb(0, 150, 136)', active : false},
	{colorClass : 'forth-theme', color : 'rgb(63, 81, 181)', active : false},
    ] ;
    
    constructor(private overlay : OverlayContainer, public communication : CommunicationService) { }
    
    changeTheme(inx){
	//установка темы приложения
	this.colorItems.forEach(col => {
	    col.active = false;
	}) ;
	let color = this.colorItems[inx];
	color.active = true;
	this.overlay.getContainerElement().classList.add(color.colorClass);
	this.communication.sendResource({type : 'changedColor' , value : color.colorClass});
	window.localStorage.setItem('colorIndex', inx) ;
    }
  
  ngOnInit() {
      this.changeTheme(window.localStorage.getItem('colorIndex') || 1);
  }

}
