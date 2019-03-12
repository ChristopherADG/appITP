import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {UserService} from '../../user.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id:String;
  user: any = {};
  updateForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder,  private cookieService: CookieService) {
    this.createForm();
  }

  ngOnInit() {
    if(this.getRole()!="Admin"){
      this.router.navigate(['/orders']);
    }
    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.userService.getUserById(this.id).subscribe(res=>{
        this.user = res;
        this.updateForm.get('name').setValue(this.user.name);
        this.updateForm.get('last_name').setValue(this.user.last_name);
        this.updateForm.get('email').setValue(this.user.email);
        this.updateForm.get('password').setValue('');
        this.updateForm.get('passwordConf').setValue('');
        this.updateForm.get('role').setValue(this.user.role);
      })
    })
  }

  getRole(){
    const role = JSON.parse(this.cookieService.get('user')).role;
    return role;
  }

  createForm(){
    this.updateForm = this.fb.group({
      name: ['', Validators.required ],
      last_name: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      passwordConf: ['', Validators.required ],
      role: ['', Validators.required ]
    });
  }

  updateUser(name,last_name,email,password, role){
    this.userService.updateUser(this.id,name,last_name,email,password, role).subscribe(()=>{
      this.router.navigate(['/users']);
    })
  }

}
