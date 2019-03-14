import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {DinningRoomService} from '../../Services/dinning-room.service';
import {UserService} from '../../user.service';
import {User} from '../../User'

@Component({
  selector: 'app-dinning-room-update',
  templateUrl: './dinning-room-update.component.html',
  styleUrls: ['./dinning-room-update.component.css']
})
export class DinningRoomUpdateComponent implements OnInit {

  id:String;
  dinningRoom: any = {};
  chefs : User[];

  constructor(private dinningRoomService: DinningRoomService, private router: Router, private userService : UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getChefs()

    this.route.params.subscribe(param =>{
      this.id = param.id;
      this.dinningRoomService.getDinningRoomById(this.id).subscribe(res=>{
        this.dinningRoom = res;
        //console.log(this.dinningRoom)
        let temp = document.getElementById('name') as HTMLInputElement
        temp.value =this.dinningRoom.name
        let temp2 = document.getElementById('chefManager') as HTMLSelectElement
        temp2.value =this.dinningRoom.chefManager
        let temp3 = document.getElementById('phone') as HTMLInputElement
        temp3.value =this.dinningRoom.phone
        let temp6 = document.getElementById('street') as HTMLInputElement
        temp6.value =this.dinningRoom.street
        let temp7 = document.getElementById('number') as HTMLInputElement
        temp7.value =this.dinningRoom.number
        let temp8 = document.getElementById('ext_number') as HTMLInputElement
        temp8.value =this.dinningRoom.ext_number
        let temp9 = document.getElementById('colony') as HTMLInputElement
        temp9.value =this.dinningRoom.colony
        let temp10 = document.getElementById('pc') as HTMLInputElement
        temp10.value =this.dinningRoom.pc
      })
    })
  }

  getChefs(){
    this.userService.getChefs().subscribe((data: User[])=>{
      this.chefs = data
    })
  }

  updateDinningRoom(street,chefManager, phone, name, pc,number,ext_number,colony){
    this.dinningRoomService.updateDinningRoom(this.id,street,chefManager, phone, name, pc,number,ext_number,colony).subscribe(()=>{
      this.router.navigate(['/dinningRooms']);
    })
  }

}
