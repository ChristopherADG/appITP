import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {OrderService} from '../../Services/order.service';
import {ShippingService} from '../../Services/shipping.service';
import {AuthService} from '../../Services/auth.service';
import {DinningRoomService} from '../../Services/dinning-room.service'

@Component({
  selector: 'app-deliveries-detail',
  templateUrl: './deliveries-detail.component.html',
  styleUrls: ['./deliveries-detail.component.css']
})
export class DeliveriesDetailComponent implements OnInit {

  id : String;
  order:any = {};
  dinningRoom:any = {};

  constructor(private shippingService: ShippingService,
    private router: Router, private chRef: ChangeDetectorRef,
    private authService: AuthService, private route: ActivatedRoute,
    private dinningRoomService: DinningRoomService) { }

  ngOnInit() {
    this.route.params.subscribe(param =>{
      //console.log(param)
      this.id = param.id;
      this.shippingService.getShippingById(this.id).subscribe(shipping =>{


        this.order = shipping
        if(this.order.status == undefined){
          this.order.status = '0';
        }
        console.log(this.order.status)
        this.chRef.detectChanges();
      })
    })
  }

  approveDeliverie(id){
    if(confirm('Are you sure?')){
      this.shippingService.approveDeliverie(id).subscribe(()=>{
        this.router.navigate(['/shippings'])
      })
    }
  }


}
