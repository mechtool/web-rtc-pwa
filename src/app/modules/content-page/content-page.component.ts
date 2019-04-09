import { Component, OnInit } from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay";
import {sideNavListTrigger, routerTransition} from "../../animations/animations";
import {SideNavItem} from "../../classes/Classes";

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
    animations : [sideNavListTrigger, routerTransition]
})
export class ContentPageComponent implements OnInit {
    
    public sideNavMode = 'side' ;
    public sidenavItems  = [];
    public localMenuClass = 'closed';
    public colorMenuVisibility = false;
    public appHeader = 'Облачные функции' ;
    
    
    public colorItems = [
	{colorClass : 'first-theme', color : 'rgb(255, 214, 0)', active : true},
	{colorClass : 'second-theme', color : 'rgb(30, 136, 229)', active : false},
	{colorClass : 'third-theme', color : 'rgb(0, 150, 136)', active : false},
	{colorClass : 'forth-theme', color : 'rgb(63, 81, 181)', active : false},
    ] ;
    public componentCssClass = this.colorItems[1].colorClass;
    
    
    constructor(	private overlay : OverlayContainer) { }

  ngOnInit() {
  }
    
    ngAfterViewInit(){
	this.sidenavItems = [    //Элементы основного меню приложения
	    new SideNavItem('Введение', 'zero', '/content-page/introduction'),
	    new SideNavItem('Возможности', 'zero', '/content-page/capabilities')]
    }
    
    onClickLocalMenu(){
	this.localMenuClass = this.localMenuClass === 'closed' ? 'opened' : 'closed';
    }
  
    
    onClickMenuIcon(sidenav){
        sidenav.toggle();
    }
    onClickItemSidenav(item){
	item.active = !item.active;
	item.icon =  item.active ? 'arrow-down' : 'arrow-right' ;
    }
    
    getState(outlet){
    
    }
  
    onSetTheme(theme) {
	let that= this;
	this.colorItems.forEach(elem => {//изменение активности иконки элемента выбора цветового меню
	    elem.active = false;
	    elem.colorClass === theme && (elem.active = true);
	}) ;
	//установка темы приложения
	this.overlay.getContainerElement().classList.add(theme);
	this.componentCssClass = theme;
	//удаление цветового меню
	/*	setTimeout(()=> {
		    that.colorMenuVisibility = false;
		    that.changeRef.detectChanges()
		}, 100);*/
	/*
		this.router.navigateByUrl( '/content-page/started' );
	*/
	
    }

}
