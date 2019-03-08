import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service'
import { Router} from '@angular/router'
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logOut()
    this.flashMessage.show('Log out',{cssClass: 'alert-success', timeout: 5000});
    this.router.navigate(['login'])
  }

  slideBar: Boolean = true;

  hide(){
    if(this.slideBar){
      this.slideBar = false;
      document.body.className = document.body.className.replace("sidebar-toggled","");
      document.getElementById("slidebar").classList.remove('toggled');
    }else{
      this.slideBar = true;
      document.body.className = document.body.className.replace("","sidebar-toggled");
      document.getElementById("slidebar").classList.add('toggled');
    }
  }
}
