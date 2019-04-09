import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*import {StartPageComponent} from './modules/start-page/start-page.component';*/
import {ContentPageModule} from './modules/content-page/content-page.module';

const routes: Routes = [
   // {path : 'start-page', component : StartPageComponent, data : {type : 'start-page'}},
    {path : 'content-page',  loadChildren: ()=> ContentPageModule/*'./modules/content-page/content-page.module#ContentPageModule'*/},
    {path : '', redirectTo : 'content-page', pathMatch : 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
