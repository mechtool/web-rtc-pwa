import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material/material.module";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { AuthPageComponent } from './modules/auth-page/auth-page.component';
import {AuthFirebaseService} from "./services/auth-firebase.service";
import {ContentPageComponent} from "./modules/content-page/content-page.component";
import {SharedModule} from "./modules/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthFirebaseComponent} from "./modules/auth-firebase/auth-firebase.component";
import {PushNotificationService} from "./services/push-notification.service";
import {ProcessErrorCodeService} from "./services/process-error-code.service";
import {MessagingService} from "./services/messaging.servece";
import { SettingsPageComponent } from './modules/settings-page/settings-page.component';
import { ContactsPageComponent } from './modules/contacts-page/contacts-page.component';
import {DatabaseService} from "./services/database.service";

@NgModule({
  declarations: [
    AppComponent,
      ContentPageComponent,
    AuthPageComponent,
      AuthFirebaseComponent,
      SettingsPageComponent,
      ContactsPageComponent,
  ],
  imports: [
    BrowserModule,
      RouterModule,
    BrowserAnimationsModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      SharedModule,
      MaterialModule,
      AppRoutingModule,
  ],
  providers: [
      AuthFirebaseService,
      PushNotificationService,
      ProcessErrorCodeService,
      MessagingService,
      DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
