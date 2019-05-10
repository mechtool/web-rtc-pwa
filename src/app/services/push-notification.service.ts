import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

/*Если сервером сообщений является Firebase

var firebase = require("firebase/app");
// Add additional services that you want to use
require("firebase/auth");
require("firebase/database");
require("firebase/messaging");
firebase.initializeApp(environment.firebaseConfig);*/

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  
    public swRegistration;
  
  constructor(public http : HttpClient) {
      this.initialiseMessaging();
  }
  
  initialiseMessaging(){
      let that = this;
      if ('serviceWorker' in navigator && 'PushManager' in window) {
	  console.log('Service Worker and Push is supported');
	  navigator.serviceWorker.register('sw.js')
	      .then(function(swReg) {
		  console.log('Service Worker is registered', swReg);
		  that.swRegistration = swReg;
		  //После регистрации сервисного рабочего необхожимо получить серверный открытый ключ с сервера и
		  //конвертировать его (строку) в Uint8Array
		  that.getServerKey().then(key => {
		       //Сохранение окрытого ключа локально
		      window.localStorage.setItem('appPublicKey', key);
		      that.startMessaging();//Запускаем реализацию сообщений после получения серверного ключа
		  }).catch(err =>{
		      console.log('Ошибка при получении открытого ключа с сервера '+ err)
		  });
		  //Если сервисный рабочий не имеет предопределенное имя firebase-messaging-sw.js, сервером сообщения
		  // является Firebase тогда
		  //нужно определить регистрацию, которую будет использовать сервер сообщений
		  //messaging.useServiceWorker(swRegistration);
	      })
	      .catch(function(error) {
		  console.error('Service Worker Error', error);
		  //todo сообщение пользователю о невозможности использования приложения
	      });
      } else {
	  console.warn('Push messaging is not supported');
	  //todo сообщение пользователю о том, что его браузер не поддерживает Push
      }
  }
 
  private urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
	    .replace(/\-/g, '+')
	    .replace(/_/g, '/');
	
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	
	for (let i = 0; i < rawData.length; ++i) {
	    outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
    }
  
  private getServerKey(){
     return Promise.race([fetch('/app-public-key').then(res => res.text())]);
 }
  
  private startMessaging(){
      let that = this;
      //Проверка получения подписки текущего пользователя
      this.swRegistration.pushManager.getSubscription()
	  .then(function(subscription) {
	     let isSubscribed = !(subscription === null);
	      //обновить подписку на сервере
	      if (isSubscribed) {
		  console.log('Пользователь подписан, отправка объекта подписки на сервер');
		  that.sendSubscriptionToServer(subscription);
	      } else {
		  console.log('Пользователь не подписан, берем разрешение и подписываем!');
		  that.subscribeUser();
	      }
	  });
  }
  
      private subscribeUser() {
          let that = this;
	  const applicationServerKey = this.urlB64ToUint8Array(window.localStorage.getItem('appPublicKey'));
	  //Если пользователь еще не дал разрешение на подписку, то её диалог запустится автоматически
	  this.swRegistration.pushManager.subscribe({
	      userVisibleOnly: true,
	      applicationServerKey: applicationServerKey
	  })
	      .then(function(subscription) {
		  console.log('Пользователь подписался!');
		  that.sendSubscriptionToServer(subscription);
	      })
	      .catch(function(err) {
		  console.log('Неудачная подписка пользователя : ', err);
		  if (Notification.permission === 'denied') {
		      console.log('Пользователь отклонил подписку!')
		  }
	      });
      }
  
  sendSubscriptionToServer(subscription){ //Отправка оюъекта подписки на сервер
       this.http.post('/set-user-subscription', subscription).subscribe(res =>{
           console.log('Подписка пользователя отправлена на сервер!')
       })
  }
}
