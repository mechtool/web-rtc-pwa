import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Optional} from '@angular/core';
import {sideNavListTrigger, routerTransition} from "../../animations/animations";
import {Contact, SideNavItem} from "../../classes/Classes";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {MessagingService} from "../../services/messaging.servece";
import {CommunicationService} from "../../services/communication.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Subject} from "rxjs";
import {DatabaseService} from "../../services/database.service";
import {AuthFirebaseService} from "../../services/auth-firebase.service";

const firebase = require('firebase/app');
require('firebase/auth');

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
    animations : [sideNavListTrigger, routerTransition]
})
export class ContentPageComponent implements OnInit, AfterViewInit {
    
    public user;
    public sideNavMode : 'over' | 'push' | 'side' = 'side' ;
    public sidenavItems  : SideNavItem[] = [];
    public permissionOverlay = false;
    public progressVisible = false;
    public contacts : Subject<Contact[]> = new Subject();
    public overlayMessage = 'Для полноценной работы приложения, ему необходимо получить Ваше разрешение на возможность отправлять и получать сообщения вашим собеседникам. Это разрешение выдается один раз, и в последствии будет использовано автоматически. Если приложение не получит Ваше разрешение, Вы не сможет полноценно использовать приложение.';
    
    public contentButtons = [
	{text : 'Сообщения', link : '/content/messages'},
	{text : 'Звонки', link : '/content/calls'},
	{text : 'Чаты', link : '/content/charts'},
	{text : 'Контакты', link : '/content/contacts'},
    ];
    
    constructor(
	    private media: BreakpointObserver,
	    public changeRef : ChangeDetectorRef,
	    public router : Router,
	    public sanitizer : DomSanitizer,
	    private communication : CommunicationService,
	    private messagingService : MessagingService,
	    public databaseService : DatabaseService,
	    public authService : AuthFirebaseService,
	) {
	    
	    this.user = authService.user;
	    this.media.observe('(max-width: 599px)').subscribe((sub)=>{  //наблюдение за медиаточкой
		this.sideNavMode = sub.matches ? 'over' : 'side';
	    } );
	    this.communication.communicateObservable.subscribe(message => {
	        if(message.type == 'permission-overlay'){
	           this.permissionOverlay = true;
		}
	    }) ;
	    this.router.events.subscribe((event) => { //запуск прогресс бара загрузки страницы с сервера
		if(event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationCancel){
		    this.progressVisible = event instanceof NavigationStart;
		    this.changeRef.markForCheck();
		}
	    });
    }

  ngOnInit() {
        //проверка при входе на существования пользователя
      if(this.user){
	  this.messagingService.startMessaging();
      }else this.router.navigateByUrl('/auth') ;
  }
    
    onClickContact(uid){
    
    }
  
    getMessagingPermission(){
       this.messagingService.getPermission().then((resp)=>{
	   this.permissionOverlay = false;
	   this.changeRef.markForCheck();
       }).catch(err => {
           this.overlayMessage = '<span style="color: #e20000" >К сожалению, пользователь не разрешил обмен сообщениями, поэтому для продолжения работы приложения необходимо отменить запрет на обмен сообщениями в браузере и повоторить попытку.</span>';
	   this.changeRef.markForCheck();
       })
    }

    ngAfterViewInit(){
	this.sidenavItems  = [    //Элементы основного меню приложения
	    new SideNavItem('Введение', 'zero', '/content-page/introduction'),
	    new SideNavItem('Возможности', 'zero', '/content-page/capabilities')]
    }
  
    onClickMenuIcon(sidenav){
        sidenav.toggle();
    }
    
    onClickItemSidenav(item){
	item.active = !item.active;
	item.icon =  item.active ? 'arrow-down' : 'arrow-right' ;
    }
    
    getState(outlet) {
	return outlet.activatedRouteData.type;
    }

}
