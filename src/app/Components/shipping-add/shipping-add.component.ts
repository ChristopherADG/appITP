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

  constructor(private truckService: TruckService, private chRef: ChangeDetectorRef
   ,private dinningRoomService: DinningRoomService, private orderService: OrderService,
   private router: Router, private cookieService: CookieService, private elRef:ElementRef) {

  }
  ngOnInit() {

  }

  /*addShipping(dinningRoom,driverName,product){
    let selectedDR = this.availableDinningRooms[dinningRoom.selectedIndex]
    let tempDR = {
      id: selectedDR._id,
      name: selectedDR.name
    }
    this.orderService.addOrder(tempDR,description,products,0).subscribe(()=>{
      this.router.navigate(['/orders']);
    })
  }

  getFieldsInfo(){
    let arr = []
    this.categoryFields.forEach(category =>{
      this.fields[this.categoryFields.indexOf(category)].forEach(field=>{
        var dinningRoom = document.getElementById("dinningRoom"+field) as HTMLInputElement;
        var driverName = document.getElementById("driverName"+field) as HTMLSelectElement;
        var product = document.getElementById("product"+field) as HTMLSelectElement;

        let tempProduct = tempProduct.approvedOrders[product.selectedIndex-1]
        let tempDinningRoom = tempDinningRoom.approvedOrders[dinningRoom.selectedIndex-1]
        let tempDriverName =  tempDriverName.trucks[driverName.selectedIndex-1]

        let temp = {
          dinningRoom: tempDinningRoom,
          driverName: tempDriverName,
          product: {
            id: tempProduct._id,
            name: tempProduct.name
          }
        }
        arr.push(temp)
      })
    })
    return arr
  }*/
}
