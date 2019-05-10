import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, NgZone, ViewChild} from '@angular/core';
import { Router, RouterOutlet} from "@angular/router";
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {routerTransition} from './animations/animations';
import {AuthFirebaseService} from "./services/auth-firebase.service";
import {CommunicationService} from "./services/communication.service";
import {environment} from "../environments/environment";

//Загрузка библиотеки должна быть первой
import * as firebase from 'firebase/app';
import 'firebase/database'
firebase.initializeApp(environment.firebaseConfig);
const database = firebase.database();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.css'],
    animations : [routerTransition],
    changeDetection : ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    
    @HostBinding('class') componentCssClass = 'second-theme';
    @ViewChild('mainOutlet') public mainOutlet : RouterOutlet;

    constructor(
	private router : Router,
	private changeRef : ChangeDetectorRef,
	private iconRegistry : MatIconRegistry ,
	private sanitizer : DomSanitizer,
	public authService : AuthFirebaseService,
	private ngZone: NgZone,
	private communicationService : CommunicationService
    ) {

	//Старт сервиса аутентификации с подпиской на изменения пользователя
        this.authService.startService(user => {
            let url = user ? '/content' : '/auth';
	    this.ngZone.run(() => this.router.navigateByUrl(url)).then(res => {
		this.communicationService.sendResource({type : 'enter-note', value : !user ? '...выберите провайдера' : '...ожидаем вход'});
	    });
        });
        
        this.communicationService.communicateObservable.subscribe(opt => {
               if(opt.type == 'changedColor'){
                   this.componentCssClass = opt.value;
	       }
	}) ;
	
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
    
}
