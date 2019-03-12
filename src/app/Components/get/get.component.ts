import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../User';
import {UserService} from '../../user.service';
import { CookieService } from 'ngx-cookie-service';

declare var $;

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  users : User[];

  dataTable: any;

  constructor(private userService: UserService, private router: Router, private chRef: ChangeDetectorRef,  private cookieService: CookieService) { }

  ngOnInit() {
    if(this.getRole()!="Admin"){
      this.router.navigate(['/orders']);
    }
    this.fetchUsers();

  }

  getRole(){
    const role = JSON.parse(this.cookieService.get('user')).role;
    return role;
  }

  fetchUsers(){
    this.userService.getUsers()
    .subscribe((data: User[])=>{
      this.users = data;

      this.chRef.detectChanges();

      const table: any = $('table');
      this.dataTable = table.DataTable()
    })


  }

  editUser(id){
    this.router.navigate([`/edit/${id}`]);
  }

  deleteUser(id){
    if(confirm('Are you sure to delete this record?')){
      this.userService.deleteUser(id).subscribe(()=>{
        this.fetchUsers();
      })
    }
  }
}
