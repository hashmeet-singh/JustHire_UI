import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  user: any = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.loadUser().subscribe(item => {
      this.user = item;
      console.log(this.user);
    });
  }

}
