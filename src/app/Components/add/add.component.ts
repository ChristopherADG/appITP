import { Component, OnInit } from '@angular/core';
//import {FormGroup, FormBuilder, Validators} from '@angular/forms'
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

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.fetchRoles()
  }

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
