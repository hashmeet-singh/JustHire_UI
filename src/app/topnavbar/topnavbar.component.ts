import { Component, OnInit } from '@angular/core';
import {smoothlyMenu} from '../app.helpers';
import { Router } from '../../../node_modules/@angular/router';
import { AuthenticationService } from '../authentication.service';
// import {jQuery} from '../../../node_modules/jquery'
@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  toggleNavigation(): void {
    
    // jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
}
logout() {
  console.log('Logging out');
  this.authenticationService.logout();
}
}
