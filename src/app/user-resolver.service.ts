import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class UserResolverService {

  constructor(private userService: UserService) { }

  resolve(routes: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.loadUser();
  }
}