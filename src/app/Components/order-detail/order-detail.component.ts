import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Order} from '../../Models/Order'
import {OrderService} from '../../Services/order.service';
import {AuthService} from '../../Services/auth.service'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService, 
    private router: Router, private chRef: ChangeDetectorRef,
    private authService: AuthService, private route: ActivatedRoute) { }

  id : String
  order:any = {};

  ngOnInit() {
    this.route.params.subscribe(param =>{
      this.id = param.id;
      this.orderService.getOrderById(this.id).subscribe((order)=>{
         this.order = order;
         //console.log(order)
         this.chRef.detectChanges();
         document.getElementById('date').innerText = this.order.date;
         document.getElementById('time').innerText = this.order.time;
         document.getElementById('chefName').innerText = this.order.user.name + " "+ this.order.user.last_name;
         document.getElementById('chefEmail').innerText = this.order.user.email;
         document.getElementById('role').innerText = this.order.user.role;
         document.getElementById('description').innerText = this.order.description;
         document.getElementById('dinningRoomName').innerText = this.order.dinningRoom.name
         document.getElementById('dinningRoomStreet').innerText = this.order.dinningRoom.street
         document.getElementById('dinningRoomExt').innerText = '#'+this.order.dinningRoom.ext_number
         document.getElementById('dinningRoomColony').innerText = this.order.dinningRoom.colony
         document.getElementById('dinningRoomZip').innerText = 'C.P. ' + this.order.dinningRoom.pc
         document.getElementById('dinningRoomPhone').innerText = this.order.dinningRoom.phone
         this.chRef.detectChanges();
      })
    })
  }

  approveOrder(id){
    if(confirm('Are you sure to approve this order?')){
      this.orderService.approveOrder(id).subscribe(()=>{
        this.router.navigate(['orders'])
      })
    }
  }

  denyOrder(id){
    if(confirm('Are you sure to deny this order?')){
      this.orderService.denyOrder(id).subscribe(()=>{
        this.router.navigate(['orders'])
      })
    }
  }
  

}
