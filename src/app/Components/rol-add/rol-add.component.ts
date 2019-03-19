import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {UserService} from '../../user.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
@Component({
  selector: 'app-rol-add',
  templateUrl: './rol-add.component.html',
  styleUrls: ['./rol-add.component.css']
})
export class RolAddComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  validatingForm: FormGroup;
  ngOnInit() {

    this.validatingForm = new FormGroup({
      rolName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)])
    });
  }

  get rolName() { return this.validatingForm.get('rolName'); }


  addRole(name){
    this.userService.addRole(name)
      .subscribe(()=>{
        this.router.navigate(['/roles']);
      })
  }
  
}