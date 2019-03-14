import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {UserService} from '../../user.service';
@Component({
  selector: 'app-rol-add',
  templateUrl: './rol-add.component.html',
  styleUrls: ['./rol-add.component.css']
})
export class RolAddComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  addRole(name){
    this.userService.addRole(name)
      .subscribe(()=>{
        this.router.navigate(['/roles']);
      })
  }
  
}