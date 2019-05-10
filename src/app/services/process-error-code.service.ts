import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessErrorCodeService {

  constructor() { }
  
  processFromEmailPass(err){
      return new Promise(function(resolve, reject){
	  switch (err.code) {    //Обработки ошибок
	      case 'auth/wrong-password' : resolve({code :'Неверный пароль или пароль отсутствует!'});
		break;
	      case 'auth/weak-password' : resolve({code : 'Слишком слабый пароль!'})  ;
	        break;
	      case 'auth/invalid-email' :  resolve({code : 'Некоректный email!'});
	      break;
	      case 'auth/user-not-found' : resolve({code : 'Пользователь не найден!'})
	  }
      })

      
  }
}
