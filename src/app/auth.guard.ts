import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthenticationService, private router: Router) {

  }

  canActivate() {

    if (this.authService.loggedIn())
      return true;
    else {
      this.router.navigate(['login']);
    }
    return false;
  }

  canActivateChild(){

    return this.authService.checkIfAdmin();
  }
}
