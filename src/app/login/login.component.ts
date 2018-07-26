import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import {Md5} from 'node_modules/ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // md5 = new Md5();
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authenticateService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  handleSubmit(event) {
    if (this.loginForm.valid) {
      // console.log('Password '+Md5.hashStr(this.loginForm.value['password']));
      this.loginForm.value['password'] = Md5.hashStr(this.loginForm.value['password']);
      // console.log('New Password'+ this.loginForm.value['password']);
      this.authenticateService.authenticateUser(this.loginForm.value).subscribe(response => {
        console.log(response);
        if (response['message'] === 'Login Successful') {
          this.authenticateService.storeUserData(response['token'], response['user']);
          this.router.navigate(['home']);
        }
        else{
          this.router.navigate(['login']);
        }
      });


    }
  }

}
