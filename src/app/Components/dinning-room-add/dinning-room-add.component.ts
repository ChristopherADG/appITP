import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {DinningRoomService} from '../../Services/dinning-room.service';
import {UserService} from '../../user.service';
import {User} from '../../User'


@Component({
  selector: 'app-dinning-room-add',
  templateUrl: './dinning-room-add.component.html',
  styleUrls: ['./dinning-room-add.component.css']
})
export class DinningRoomAddComponent implements OnInit {

  id:String;
  dinningRoom: any = {};
  chefs : User[];

  constructor(private dinningRoomService: DinningRoomService, private router: Router, private userService : UserService) { }

  ngOnInit() {
    this.getChefs()
  }

  addDinningRoom(street,chefManager, phone, name, pc,number,ext_number,colony){
    //console.log(street,chefManager, phone, name, pc,number,ext_number,colony)
    this.dinningRoomService.addDinningRoom(street,chefManager, phone, name, pc,number,ext_number,colony)
      .subscribe(()=>{
        this.router.navigate(['/dinningRooms']);
      })
  }

  getChefs(){
    this.userService.getChefs().subscribe((data: User[])=>{
      this.chefs = data
    })
  }

}
