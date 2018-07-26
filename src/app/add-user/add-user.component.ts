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
  originalUser: any;
  isEditing: boolean = false;
  addUserForm: FormGroup;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,) { }

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

    this.route.params.subscribe(routeParam=>{
      let id = routeParam['userId'];
      if (id) {

        this.userService.loadUserById(id)
          .subscribe(user => {
            console.log(user);
            this.originalUser = user;
            this.userForm.patchValue(user)
            this.isEditing = true;
          })
      };
    });
    

  }


  handleSubmit(e){
    if(this.isEditing){
      let formData = this.userForm.value;
      let user = Object.assign({}, this.originalUser, formData);
      formData.email = user.email;
      this.userService.update(user.userId, user)
        .subscribe(question => {
          this.userForm.reset();
          this.router.navigateByUrl('home', {skipLocationChange: true})
          .then(()=>this.router.navigate(['/home/user/view']));
          this.isEditing = false;
        })
      return;
    }
    else {
    this.userService.addUser(this.userForm.value).subscribe(item=>{
      console.log(item);
      this.userForm.reset();
    });
  }
  }
}
