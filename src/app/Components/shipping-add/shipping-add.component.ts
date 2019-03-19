import { Component, OnInit ,ChangeDetectorRef, ElementRef} from '@angular/core';
import {OrderService} from '../../Services/order.service'
import {ApprovedOrders} from '../../Models/ApprovedOrders';
import {DinningRoomService} from '../../Services/dinning-room.service';
import {DinningRoom} from '../../Models/DinningRoom'
import {TruckService} from '../../Services/truck.service';
import {Truck} from '../../Models/Truck'
import {ShippingService} from '../../Services/shipping.service'
import {Router} from '@angular/router'
import {CookieService} from 'ngx-cookie-service'
declare var $;

@Component({
  selector: 'app-order-add',
  templateUrl: './shipping-add.component.html',
  styleUrls: ['./shipping-add.component.css']
})
export class ShippingAddComponent implements OnInit {

  availableDinningRooms : ApprovedOrders[];
  availableDrivers : Truck[];

  constructor(private truckService: TruckService, private chRef: ChangeDetectorRef
   ,private dinningRoomService: DinningRoomService, private orderService: OrderService,
   private router: Router, private cookieService: CookieService, private elRef:ElementRef) {

  }
  ngOnInit() {
    this.getDinningRooms();
    this.getDrivers();
  }

  getDinningRooms(){
    let user = JSON.parse(this.cookieService.get('user')) ;
    if(user.role == "Admin"){
      this.orderService.getApprovedOrdersByStaus(1).subscribe((data: ApprovedOrders[])=>{
        this.availableDinningRooms = data;
        this.chRef.detectChanges();
      })
    }
  }

  getDrivers(){
    let user = JSON.parse(this.cookieService.get('user')) ;
    if(user.role == "Admin"){
      this.truckService.getTruck().subscribe((data: Truck[])=>{
        this.availableDrivers = data;
        this.chRef.detectChanges();
      })
    }
  }
}
