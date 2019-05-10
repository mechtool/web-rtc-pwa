import {Injectable, Optional} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import {CommunicationService} from "./communication.service";
@Injectable({
    providedIn: 'root'
})
export class MessagingService {
    
    public swRegistration;
    public messaging = firebase.messaging();
    
    constructor(private communication : CommunicationService) {
        let that = this;
        //Подписка на сервис сообщений в приложении
	//Подписка на событие обновления токена
	this.messaging.onTokenRefresh(function() {
	    //Получение нового токена
	    that.getToken().then((token)=>{
		//Отправка нового токена на сервер и замену старого токена
		that.sendTokenToServer(token);
	    
	    })
	});
	//При получении сообщения от Push сервиса, отобразить сообщение пользователю
	that.messaging.onMessage(function(payload) {
	    console.log('Получено новое сообщение!. ', payload);
	    //Отобразить пользовательский интерфейс с новым сообщением
	    //todo Здесь находиться реализация отображения пользовательского интерфейса нового сообщения
	});
	this.initialiseMessaging()
    }
    
    public initialiseMessaging(){
	let that = this;
	if ('serviceWorker' in navigator && 'PushManager' in window) {
	    console.log('Серивисный рабочий и PushNotification поддерживаються.');
	    navigator.serviceWorker.register('./firebase-messaging-sw.js')
		.then(function(swReg) {
		    console.log('Сервисный рабочий зарегистрирован!', swReg);
		    that.swRegistration = swReg;
		    //Если сервисный рабочий не имеет предопределенное имя firebase-messaging-sw.js, тогда
		    //нужно определить регистрацию, которую будет использовать сервер сообщений
		    //messaging.useServiceWorker(registration);
		})
		.catch(function(error) {
		    console.error('Ошибка при регистрации сервисного рабочего!', error);
		});
	} else {
	    console.warn('Серивисный рабочий и PushNotification поддерживаються!');
	}
    }
    //1. При инициализации основного компонента приложения проверяем имеется ли токен данного пользователя
    //на сервере Firebase (Push сервер)
    public startMessaging(){
        let that = this;
	this.getToken().then((token)=>{
	    //Если токен имеется, записываем (обновляем) его в базу на сервере приложения
	    if(token){
		console.info('Токен пользователя получен!');
		that.sendTokenToServer(token);
	    }else{ //тип токена null, значит у пользователя нет еще токена
		//Если токена нет на Push сервере, запршиваем разрешение пользователя на получение уведомлений
		//Отображаем overlay разрешения пользователя
		that.communication.sendResource({type : 'permission-overlay'})
	    }
	    
	}).catch((err)=>{
	    console.log('Произошла ошибка при получении токена пользователя '+ err);
	});
    }
    
    
    public getPermission(){  //Функция запроса разрешения пользователя в браузере
        let that = this;
	return this.messaging.requestPermission().then(function(perm) {
	    console.log('Разрешение на получение уведомлений получено!');
	    //Запускаем проверку токена
	    that.startMessaging();
	    return perm;
	});
    }
    
    public getToken(){
	return this.messaging.getToken().then(function(token) {
	    return token;
	}).catch(function(err) {
	    console.log('Невозможно получить токен!', err);
	});
    }
    //Отправка нового токена на срвер
    private sendTokenToServer(token){
    
    }
    
    //Реализация удаление токена с Push сервера. Демонстрация возможнотей удаления токена с сервера.
    private deleteToken() {
        let that = this;
	that.messaging.getToken().then(function(currentToken) {
	    that.messaging.deleteToken(currentToken).then(function() {
		console.log('Токен удален с Push сервера.');
		//todo отобразить пользователю  успешное удаление токена
	    }).catch(function(err) {
		console.log('Возникла ошибка при удалении токена с Push сервера! ', err);
	    });
	    // [END delete_token]
	}).catch(function(err) {
	    console.log('Возникла ошибка при получении токена с Push сервера! ', err);
	});
    }
    
}
