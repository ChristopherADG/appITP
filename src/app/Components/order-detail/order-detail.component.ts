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

  ngOnInit() {
    this.route.params.subscribe(param =>{
      this.id = param.id;
      this.orderService.getOrderById(this.id).subscribe((order:Order)=>{
         
      })
    })
  }

  

}
