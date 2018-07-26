import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Md5 } from '../../../node_modules/ts-md5';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: any = [];
  email: any;
  id: any;
  originalForm: any;
  changePasswordForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
      // confirmPassword: ['', Validators.required]
    });
    this.user = this.authenticationService.getUser();
    this.email = this.user.email;
    this.id = this.user.userId;
    this.changePasswordForm.patchValue({ email: this.email });
  }

  handleSubmit(e) {
    if (this.changePasswordForm.valid) {
      let formData = this.changePasswordForm.value;
      // console.log(formData);
      formData['password'] = Md5.hashStr(formData['password']);
      // console.log(formData);
      let form = Object.assign({}, this.originalForm, formData);
      console.log(form);
      this.authenticationService.updatePassword(this.id, form).subscribe(response => {
        console.log(response);
      });
    }
  }

}
