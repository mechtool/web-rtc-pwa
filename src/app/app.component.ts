import {ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {routerTransition} from './animations/animations';

var swRegistration;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.css'],
    animations : [routerTransition],
})
export class AppComponent implements OnInit{
    
    public progressVisible = false;
    @HostBinding('class') componentCssClass = 'second-theme';
    
    constructor(
	private router : Router,
	private changeRef : ChangeDetectorRef,
	private iconRegistry : MatIconRegistry ,
	private sanitizer : DomSanitizer,
    ) {

	this.router.events.subscribe((event) => { //запуск прогресс бара загрузки страницы с сервера
	    if(event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationCancel){
		this.progressVisible = event instanceof NavigationStart;
		this.changeRef.detectChanges();
	    }
	});
	
	//регистрация иконки в реестре иконок
	[
	    {name : 'local-menu', link : 'assets/icons/app-shell/menu.svg'},
	    {name : 'app-menu-open', link : 'assets/icons/app-shell/view-grid.svg'},
	    {name : 'arrow-down', link : 'assets/icons/app-shell/arrow_down-24px.svg'},
	    {name : 'active-color-item', link : 'assets/icons/app-shell/baseline-done-24px.svg'},
	    {name : 'color-fill', link : 'assets/icons/app-shell/color-fill.svg'},
	    {name : 'arrow-right', link : 'assets/icons/app-shell/arrow_right-24px.svg'},
	    {name : 'info', link : 'assets/icons/shared/outline-info-24px.svg'},
	    {name : 'warning', link : 'assets/icons/shared/outline-warning-24px.svg'},
	    {name : 'star', link : 'assets/icons/shared/outline-star-24px.svg'},
	
	].forEach(item => {
	    this.iconRegistry.addSvgIcon(item.name, this.sanitizer.bypassSecurityTrustResourceUrl(item.link));
	}) ;
	
    }
    
    
    getState(outlet) {
	return outlet.activatedRouteData.type;
    }
    
    ngOnInit(){
       this.initialiseServiceWorker();
    }
    
    
    componentAdded(component){
	debugger;
    }
    
    componentRemoved($event){
    
    }
    
    initialiseServiceWorker(){
	if ('serviceWorker' in navigator && 'PushManager' in window) {
	    console.log('Серивисный рабочий и PushNotification поддерживаються.');
	    navigator.serviceWorker.register('sw.js')
		.then(function(swReg) {
		    console.log('Сервисный рабочий зарегистрирован!', swReg);
		    swRegistration = swReg;
		})
		.catch(function(error) {
		    console.error('Ошибка при регистрации сервисного рабочего!', error);
		});
	} else {
	    console.warn('Серивисный рабочий и PushNotification поддерживаються!');
	    //pushButton.textContent = 'Push Not Supported';
	}
    }
    
}
