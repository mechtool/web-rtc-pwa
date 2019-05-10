import { Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    
    public database = firebase.database();
    public user = firebase.auth().currentUser;
    
    constructor(public http : HttpClient){}
    
    checkCreateUser(user) {
	//Если пользователя нет - создаем его в отдельной бызе
	let userRef = this.database.ref('users/' + user.uid.toString());
	return userRef.once('value', (snapshot) => {
	    snapshot.val() || userRef.set({
		uid: user.uid,
	    })
	})
    }
    
    getAllContacts(user){
        return this.database.ref('users/'+ user.uid.toString() +'/contacts').once('value');
    }
    searchContact(input : string){
	return this.http.get('/searchContacts', {params : new HttpParams({fromObject : {input : input}})});
    
    }
}


