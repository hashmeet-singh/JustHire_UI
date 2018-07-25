import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl="http://localhost:8181/api/admin/user";

  loadUser(){
    return this.http.get(this.apiUrl);
  }

  getRounds(){
    return this.http.get("http://localhost:8181/api/admin/rounds");
  }

  addUser(userForm){
    return this.http.post("http://localhost:8181/api/admin/user",userForm);
  }
}
