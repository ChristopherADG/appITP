import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import {Rol} from '../../Models/Rol';
import {UserService} from '../../user.service';
declare var $;


@Component({
  selector: 'app-rol-get',
  templateUrl: './rol-get.component.html',
  styleUrls: ['./rol-get.component.css']
})
export class RolGetComponent implements OnInit {

  roles : Rol[];

  dataTable: any;

  constructor(private userService: UserService, private router: Router, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchRoles();
  }

  fetchRoles(){
    this.userService.getRole()
    .subscribe((data: Rol[])=>{
      this.roles = data;
      this.chRef.detectChanges();
      
      const table: any = $('table');
      this.dataTable = table.DataTable()
    })
  }

  deleteRole(id){
    if(confirm('Are you sure to delete this record?')){
      this.userService.deleteRole(id).subscribe(()=>{
        this.fetchRoles();
      })
    }
  }

}