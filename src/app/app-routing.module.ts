import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthPageComponent} from "./modules/auth-page/auth-page.component";
import {ContentPageComponent} from "./modules/content-page/content-page.component";
import {SettingsPageComponent} from "./modules/settings-page/settings-page.component";
import {ContactsPageComponent} from "./modules/contacts-page/contacts-page.component";

const routes: Routes = [
    {path : 'auth', component : AuthPageComponent, data : {type : 'auth'}},
    {path : 'content',  data : {type : 'content-page'},  component  : ContentPageComponent, children : [
	    {path : 'settings', component : SettingsPageComponent, data : {type : 'settings'}},
	    {path : 'chats', component : SettingsPageComponent, data : {type : 'chats'}},
	    {path : 'messages', component : SettingsPageComponent, data : {type : 'messages'}},
	    {path : 'calls', component : SettingsPageComponent, data : {type : 'calls'}},
	    {path : 'contacts', component : ContactsPageComponent, data : {type : 'contacts'}},
	]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
