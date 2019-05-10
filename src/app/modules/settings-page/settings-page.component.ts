import {AfterViewInit, Component } from '@angular/core';
import {AuthFirebaseService} from "../../services/auth-firebase.service";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements AfterViewInit {

    
    public accordionAnimation = true;
  constructor(private authService : AuthFirebaseService) { }

  exitApp(){
      this.authService.singOut();
  }
  
  ngAfterViewInit(){
      this.accordionAnimation = false;
  }

}
