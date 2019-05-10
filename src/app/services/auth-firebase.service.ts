import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import 'firebase/auth';
import {User} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
    
    public user: User;
    public auth: firebase.auth.Auth = firebase.auth();
    
    constructor() {}
    
    public startService(func){
	this.user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged((user) => {
	    this.user = user;
	    func(user);
	})
    }
    
    public singOut() {
	this.auth.signOut().then(() => {
		//Сообщение о выходе пользователя
	    }
	)
    }
    
    public emailPasswordProvider = {
	
	createEnterUser: (emailPass) => {
	    let that = this;
	    return new Promise((res, rej) => {
		firebase.auth().createUserWithEmailAndPassword(emailPass.mail, emailPass.pass).then(resp => {
		    //Пользователь успешно создан
		    res(resp);
		}).catch(err => {//Обработка ошибок создания пользователя
		    if (err.code == 'auth/email-already-in-use') {
			that.auth.signInWithEmailAndPassword(emailPass.mail, emailPass.pass)
			    .then(() => {
				res();
			    })
			    .catch(err => {
				rej(err);
			    });
		    } else {
			rej(err);
		    }
		    
		});
	    })
	}
    };
    
    public googleProvider = {
	
        singIn(type) {
	    // Using a popup.
	    if (type == 'redirect') {
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
		return firebase.auth().getRedirectResult().then((result) => {
		    return this.user = result.user;
		}).catch(function (error) {
		    console.log(error)
		});
		
	    }
	}
    };
}
