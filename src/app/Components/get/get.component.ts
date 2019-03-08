import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../User';
import {UserService} from '../../user.service';
declare var $;

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  users : User[];

  dataTable: any;

  constructor(private userService: UserService, private router: Router, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchUsers();
    
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
    this.userService.deleteUser(id).subscribe(()=>{
      this.fetchUsers();
    })
  }

}
