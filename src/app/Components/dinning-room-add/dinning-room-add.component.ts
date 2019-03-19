import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {DinningRoomService} from '../../Services/dinning-room.service';
import {UserService} from '../../user.service';
import {User} from '../../User'
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'


@Component({
  selector: 'app-dinning-room-add',
  templateUrl: './dinning-room-add.component.html',
  styleUrls: ['./dinning-room-add.component.css']
})
export class DinningRoomAddComponent implements OnInit {

  id:String;
  dinningRoom: any = {};
  chefs : User[];
  validatingForm: FormGroup;
  constructor(private dinningRoomService: DinningRoomService, private router: Router, private userService : UserService) { }

  ngOnInit() {
    this.getChefs()
    this.validatingForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^[2-9]{2}\d{8}$/)]),
      street: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      ext_number: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      colony: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      pc: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{5}$/)])
      
    });

  }

  get valid_name() { return this.validatingForm.get('name'); }
  get valid_phone() { return this.validatingForm.get('phone'); }
  get valid_street() { return this.validatingForm.get('street'); }
  get valid_number() { return this.validatingForm.get('number'); }
  get valid_ext_number() { return this.validatingForm.get('ext_number'); }
  get valid_colony() { return this.validatingForm.get('colony'); }
  get valid_pc() { return this.validatingForm.get('pc'); }




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
