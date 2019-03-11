import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {DinningRoom} from '../../Models/DinningRoom';
import {DinningRoomService} from '../../Services/dinning-room.service';
declare var $;

@Component({
  selector: 'app-dinning-room-get',
  templateUrl: './dinning-room-get.component.html',
  styleUrls: ['./dinning-room-get.component.css']
})
export class DinningRoomGetComponent implements OnInit {

  dinningRooms : DinningRoom[];
  dataTable: any;

  constructor(private dinningRoomService: DinningRoomService, private router: Router, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchDinningRooms();
  }


  fetchDinningRooms(){
    this.dinningRoomService.getDinningRooms()
    .subscribe((data: DinningRoom[])=>{
      this.dinningRooms = data;
      //console.log(data)
      this.chRef.detectChanges();
      
      const table: any = $('table');
      this.dataTable = table.DataTable()
    })
  }
  editDinningRoom(id){
    this.router.navigate([`/editDinningRoom/${id}`]); 
  }

  deleteDinningRoom(id){
    if(confirm('Are you sure to delete this record?')){
      this.dinningRoomService.deleteDinningRoom(id).subscribe(()=>{
        this.fetchDinningRooms();
      })
    } 
  }
}
