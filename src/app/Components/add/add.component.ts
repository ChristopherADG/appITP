import { Component, OnInit } from '@angular/core';
//import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {UserService} from '../../user.service';
import { CookieService } from 'ngx-cookie-service';
//import User from '../User';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,  private cookieService: CookieService) {
  }

  ngOnInit() {
    if(this.getRole()!="Admin"){
      this.router.navigate(['/orders']);
    }
  }

  getRole(){
    const role = JSON.parse(this.cookieService.get('user')).role;
    return role;
  }
  
  addUser(name, last_name, email, password, role){
    this.userService.addUser(name,last_name,email,password ,role)
      .subscribe(()=>{
        this.router.navigate(['/users']);
      })
  }

}
