import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service'
import { Router} from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,  private cookieService: CookieService) { }

  ngOnInit() {
    this.getRole();
  }
  getRole(){
    const role = JSON.parse(this.cookieService.get('user')).role;
    return role;
  }
}
