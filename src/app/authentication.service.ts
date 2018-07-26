import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Router } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: any;
  private authToken: any;

  constructor(private http: HttpClient,
    private router: Router) { }


  authenticateUser(user) {
    console.log('also working');
    console.log(user);
    return this.http.post('http://localhost:8181/api/login', user, {
      headers: new HttpHeaders().set('content-type', 'application/json'),
    });
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    console.log(this.user);
    console.log(this.authToken);
  }

  loggedIn() {
    console.log(localStorage.getItem('token'));
    console.log(JSON.parse(localStorage.getItem('user')));
    return localStorage.getItem('token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  checkIfAdmin() {
    if (JSON.parse(localStorage.getItem('user'))['isAdmin'] === 0) {
      return false;
    }
    return true;
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserRound(){
    
    return JSON.parse(localStorage.getItem('user'))['round']; 
  }

  updatePassword(id,form){
    let url=`http://localhost:8181/api/login/changePassword/`;
    return this.http.put(url+`${id}`, form);
  }

}

