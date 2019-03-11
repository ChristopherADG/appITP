import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service'
import { Router} from '@angular/router'
import { FlashMessagesService} from 'angular2-flash-messages';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService, private cookieService: CookieService) { }

  ngOnInit() {
    if(this.authService.loggedIn){
      this.router.navigate(['/users'])
    }
  }
  data: any = {};
  onLogInSubmit(email, password){
    const user = {
      email: email,
      password: password
    }

    this.authService.authenticateUser(user).subscribe(data =>{
      this.data = data;
      if(this.data.success){
        this.authService.storeUserData(this.data.token, this.data.user);
        this.flashMessage.show('Log In Success',{cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/users'])
      }else{
       this.flashMessage.show(this.data.msg,{cssClass: 'alert-danger', timeout: 5000});
       this.router.navigate(['login'])
      }
    });
  }
}
