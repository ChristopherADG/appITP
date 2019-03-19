import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import {Router} from '@angular/router'
import {UserService} from '../../user.service';
import {Rol} from '../../Models/Rol'
//import User from '../User';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
 

  constructor(private userService: UserService, private router: Router) {  }

  validatingForm: FormGroup;

  ngOnInit() {
    this.fetchRoles();
    
    this.validatingForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
 
    });
  }



  get i_firstName() { return this.validatingForm.get('firstName'); }
  get i_lastName(){return this.validatingForm.get('lastName'); }
  get i_email(){return this.validatingForm.get('email'); }
  get i_password(){return this.validatingForm.get('password'); }
  //get i_confirm_password(){return this.validatingForm.get('confirmPassword'); }



  
 


  roles: Rol[]

  fetchRoles(){
    this.userService.getRole().subscribe((data: Rol[])=>{
      this.roles = data;
      console.log(this.roles)
    })
  }

  addUser(name, last_name, email, password, role){
    this.userService.addUser(name,last_name,email,password ,role)
      .subscribe(()=>{
        this.router.navigate(['/users']);
      })
  }

  

}
