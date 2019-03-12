import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {DinningRoomService} from '../../Services/dinning-room.service';
import {UserService} from '../../user.service';
import {User} from '../../User';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-dinning-room-add',
  templateUrl: './dinning-room-add.component.html',
  styleUrls: ['./dinning-room-add.component.css']
})
export class DinningRoomAddComponent implements OnInit {

  id:String;
  dinningRoom: any = {};
  chefs : User[];

  constructor(private dinningRoomService: DinningRoomService, private router: Router, private userService : UserService,  private cookieService: CookieService) { }

  ngOnInit() {
    if(this.getRole()!="Admin"){
      this.router.navigate(['/orders']);
    }
    this.getChefs()
  }

  getRole(){
    const role = JSON.parse(this.cookieService.get('user')).role;
    return role;
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
