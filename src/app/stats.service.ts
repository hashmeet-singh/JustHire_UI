import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  apiUrl: string = 'http://localhost:8181/api/admin/stats';

  constructor(private http: HttpClient) { }

  loadStats(){
    return this.http.get(this.apiUrl);
  }

  loadRounds(){
    let url=`http://localhost:8181/api/admin/rounds`;
    return this.http.get(url);
  }

  setAttributes(systemForm) {
    return this.http.post('http://localhost:8181/api/admin/attribute', systemForm);
  }
}
