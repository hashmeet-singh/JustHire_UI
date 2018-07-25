import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  rounds:any=[];
  userForm: FormGroup;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    this.userService.getRounds().subscribe(item=>{
      this.rounds=item;
      console.log(this.rounds);
    });

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',Validators.required],
      isAdmin: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      roundNumber: ['',Validators.required],
    });
  }


  handleSubmit(e){
    console.log(this.userForm.value);
    this.userService.addUser(this.userForm.value).subscribe(item=>{
      console.log(item);
      this.userForm.reset();
    });

  }
}
