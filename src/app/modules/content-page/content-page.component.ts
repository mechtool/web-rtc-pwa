import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {sideNavListTrigger, routerTransition} from "../../animations/animations";
import {Contact, SideNavItem} from "../../classes/Classes";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {MessagingService} from "../../services/messaging.servece";
import {CommunicationService} from "../../services/communication.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Subject} from "rxjs";
import {DatabaseService} from "../../services/database.service";
const firebase = require('firebase/app');
require('firebase/auth');
@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
    animations : [sideNavListTrigger, routerTransition]
})
export class ContentPageComponent implements OnInit, AfterViewInit, OnDestroy {
    
    public user;
    public sideNavMode : 'over' | 'push' | 'side' = 'side' ;
    public sidenavItems  : SideNavItem[] = [];
    public permissionOverlay = false;
    public progressVisible = false;
    public subscriptions = [];
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
	) {
     
	    //Конструктор запуститься только в том случае, если на сервере появился зарегистрированный пользователь,
	//т.е команда на запуск компонента произошла через роутер, при переходе на этот компонент из appComponent
	//из метода  this.authService.startService, после подписки на изменения статуса пользователя в сервисе аутентификации
	    this.user = firebase.auth().currentUser;
	//проверка при входе на существования пользователя
	//для предотвращения перехода на страницу по прямой ссылке в адресную строку
	    this.user ? this.messagingService.startMessaging() : this.router.navigateByUrl('/auth') ;
	    
	    this.media.observe('(max-width: 599px)').subscribe((sub)=>{  //наблюдение за медиаточкой
		this.sideNavMode = sub.matches ? 'over' : 'side';
	    } );
	    //подписка на коммуникацию с сервисами и компонентами приложения
	    this.subscriptions.push(this.communication.communicateObservable.subscribe(message => {
	        if(message.type == 'permission-overlay'){
	           this.permissionOverlay = true;
		}
	    }) );
	    //подписка на события роутера для отображения прогрессбара
	    this.subscriptions.push(this.router.events.subscribe((event) => { //запуск прогресс бара загрузки страницы с сервера
		if(event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationCancel){
		    this.progressVisible = event instanceof NavigationStart;
		    this.changeRef.markForCheck();
		}
	    }));
	    //проверка на существования пользователя в базе : если его нет, то создаем
	//и подписка на получение данных из массива контактов
	    this.databaseService.checkCreateUser(this.user).then(result => {}) ;
	    //Получение всех контактов пользователя из массива контактов
	   this.databaseService.getAllContacts(this.user).then(resp => {
	       let val = resp.val();
	       this.contacts.next(val ? val : []);
	   }).catch(err => {
	       console.log(err);
	   })
    }

  ngOnInit() {

  }
    
    onClickContact(uid){
    
    }
    
    ngOnDestroy(){
        //отписка от всех подписок
         this.subscriptions.forEach(sub => {
             sub.unsubscribe();
	 })
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
