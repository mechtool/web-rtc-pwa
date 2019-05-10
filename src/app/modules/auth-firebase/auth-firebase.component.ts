import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {AuthFirebaseService} from "../../services/auth-firebase.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProcessErrorCodeService} from "../../services/process-error-code.service";
import {CommunicationService} from "../../services/communication.service";
import {DatabaseService} from "../../services/database.service";
const firebase = require('firebase/app');
require('firebase/auth');

@Component ({
  selector: 'app-auth-firebase',
  templateUrl: './auth-firebase.component.html',
  styleUrls: ['./auth-firebase.component.css'],
    providers : [
        AuthFirebaseService,
	ProcessErrorCodeService,
    ]

})
export class AuthFirebaseComponent implements OnDestroy{
    
    public subscriptions = [];
    public verificationId;
    public activeStage = false;
    public phoneReadyCursor = 'pointer';
    public phoneButtonText = 'Проверить номер';
    public enterNote = '...ожидаем вход';
    public formType = 0;
    public providerIcons = [
	'/assets/icons/social/mail.svg',
	'/assets/icons/social/g.svg',
	'/assets/icons/social/phone.svg',
    ]  ;
    
    public states = [
	{class : 'us', code : '+1'},
	{class : 'cn', code : '+1'},
	{class : 'ru', code : '+7'},
	{class : 'kz', code : '+7'},
    ] ;
    
    public selected = this.states.find((el) => {
         return el.class === window.navigator.language.substring(0, window.navigator.language.indexOf('-'));
    });
    
    public emailPassGroup = new FormGroup({
	emailControl: new FormControl('' ,[Validators.required , Validators.email]),
	passControl: new FormControl('' , [Validators.required, Validators.minLength(8)]),
    });
    
    public phoneGroup = new FormGroup({
	countryCodeControl : new FormControl(this.selected,[Validators.required]),
	phoneNumberControl : new FormControl('',[Validators.required, Validators.pattern('[0-9]{10}')])
    }) ;
    public phoneCodeGroup = new FormGroup({
	phoneCodeControl : new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]),
    }) ;
    
    constructor(private authService : AuthFirebaseService,
		public changeRef : ChangeDetectorRef,
		public codeProcessor : ProcessErrorCodeService,
		private communicateService : CommunicationService,
		private databaseService : DatabaseService
    ) {
	this.subscriptions.push(this.communicateService.communicateObservable.subscribe(resp => {
	    if(resp.type == 'enter-note'){
		this.enterNote = resp.value;
		this.changeRef.detectChanges();
	    }
	}));
    }
    
    ngOnDestroy(){
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
    onReadyGoogleButton(type){
      this.authService.googleProvider.singIn(type).then().catch((err)=>{
          console.log(err) ;
      })
  }
    
    onCancelButton(){
        this.formType = 0;
    }
    
    onClickReadyPhone(){
      if(this.activeStage) return;
      let that = this;
      //Формируем рекапчу
	let applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
	that.activeStage = true;
	that.phoneReadyCursor = 'not-allowed';
	this.phoneButtonText = '...идет проверка' ;
	//...провайдер
	let provider = new firebase.auth.PhoneAuthProvider(),
	    ph = `${this.phoneGroup.get('countryCodeControl').value.code +''+ this.phoneGroup.get('phoneNumberControl').value}` ;
	//проверка номера
	provider.verifyPhoneNumber(ph , applicationVerifier)
	    .then(function(verificationId) {
	        //todo получение идентификатора верификации и запуск диалога принятия кода
		//обновляем интерфейс, передаем идентификатор в переменную
		that.formType = 4;
		that.activeStage = false;
		that.phoneReadyCursor = 'pointer';
		that.verificationId = verificationId;
		that.changeRef.markForCheck();
	    }).catch(err =>{
	    console.log(err)
	});
    
    }
    
    onConfirmPhoneCode(){
      let that = this;
	if(this.verificationId){
	    let credential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.phoneCodeGroup.get('phoneCodeControl').value);
		firebase.auth().signInWithCredential(credential).then((user) =>{
		    that.formType = 3;
		    that.verificationId = undefined;
		}).catch(err =>{
		    console.log(err);
		});
	}
    }
    
    onClickProviderIcons(inx){
	this.formType = inx + 1;
	this.changeRef.detectChanges();
    }
    
    onClickRemainderPass(){//Напомнить забытый пароль
        let mail = this.emailPassGroup.get('emailControl');
        if(mail.valid){
            this.authService.auth.sendPasswordResetEmail(mail.value).catch(err => {
            
	    })
	}else{
            //todo сообщить пользователю, что поле почты не корректно
	}
    }
    
    onReadyEmailPassButton(){//кнопка готовности отправки
       let that = this,
	   option = {mail : this.emailPassGroup.get('emailControl').value,  pass : that.emailPassGroup.get('passwordControl').value};
	that.authService.emailPasswordProvider.createEnterUser(option).then(user => {
	              //Пользователь удачно создан, переход на главную страницу
		}).catch(err => {
		    that.codeProcessor.processFromEmailPass(err).then(resp =>   {
		        that.changeRef.detectChanges();
		    }).catch(err =>{
		        console.log('Ошибка при обработке ошибки!')
		    })
	})
    }

}
