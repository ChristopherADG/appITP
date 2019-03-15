import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {OrderService} from '../../Services/order.service';
import {AuthService} from '../../Services/auth.service';
import {DinningRoomService} from '../../Services/dinning-room.service'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService, 
    private router: Router, private chRef: ChangeDetectorRef,
    private authService: AuthService, private route: ActivatedRoute,
    private dinningRoomService: DinningRoomService) { }

  id : String
  order:any = {};
  dinningRoom:any = {};

  ngOnInit() {
    this.route.params.subscribe(param =>{
      //console.log(param)
      this.id = param.id;
      if(param.statusId == '0'){
        this.orderService.getOrderById(this.id).subscribe((order)=>{
          if(order == null){
            this.router.navigate(['/orders']);
          }else{
           this.order = order;
           this.chRef.detectChanges();
           document.getElementById('date').innerText = this.order.date;
           document.getElementById('time').innerText = this.order.time;
           document.getElementById('chefName').innerText = this.order.user.name + " "+ this.order.user.last_name;
           document.getElementById('chefEmail').innerText = this.order.user.email;
           document.getElementById('role').innerText = this.order.user.role;
           document.getElementById('description').innerText = this.order.description;
           this.dinningRoomService.getDinningRoomById(this.order.dinningRoom.id).subscribe((dinningRoom)=>{
             this.dinningRoom = dinningRoom;
              document.getElementById('dinningRoomName').innerText = this.dinningRoom.name
              document.getElementById('dinningRoomStreet').innerText = this.dinningRoom.street
              document.getElementById('dinningRoomExt').innerText = '#'+this.dinningRoom.ext_number
              document.getElementById('dinningRoomColony').innerText = this.dinningRoom.colony
              document.getElementById('dinningRoomZip').innerText = 'C.P. ' + this.dinningRoom.pc
              document.getElementById('dinningRoomPhone').innerText = this.dinningRoom.phone
              this.chRef.detectChanges();
           })
          }
        })
      }else if(param.statusId == '1' || param.statusId == '-1'){
        this.orderService.getApproveOrderById(this.id).subscribe((order)=>{
          if(order == null){
            this.router.navigate(['/orders']);
          }else{
           this.order = order;
           //console.log(order);
           this.chRef.detectChanges();
           document.getElementById('date').innerText = this.order.date;
           document.getElementById('time').innerText = this.order.time;
           document.getElementById('chefName').innerText = this.order.user.name + " "+ this.order.user.last_name;
           document.getElementById('chefEmail').innerText = this.order.user.email;
           document.getElementById('role').innerText = this.order.user.role;
           document.getElementById('description').innerText = this.order.description;
           document.getElementById('approveObservations').innerText = this.order.approveObservations
           document.getElementById('approvedUser').innerText = this.order.approveUser.name+ " "+ this.order.approveUser.last_name;
           document.getElementById('approvedUserMail').innerText = this.order.approveUser.email;
           document.getElementById('approvedUserRol').innerText = this.order.approveUser.role
           this.dinningRoomService.getDinningRoomById(this.order.dinningRoom.id).subscribe((dinningRoom)=>{
             this.dinningRoom = dinningRoom;
              document.getElementById('dinningRoomName').innerText = this.dinningRoom.name
              document.getElementById('dinningRoomStreet').innerText = this.dinningRoom.street
              document.getElementById('dinningRoomExt').innerText = '#'+this.dinningRoom.ext_number
              document.getElementById('dinningRoomColony').innerText = this.dinningRoom.colony
              document.getElementById('dinningRoomZip').innerText = 'C.P. ' + this.dinningRoom.pc
              document.getElementById('dinningRoomPhone').innerText = this.dinningRoom.phone
              this.chRef.detectChanges();
           })
          }
        })
      }
      
    })
  }

  editOrder(id){
    this.router.navigate([`/editOrder/${id}`]); 
  }

  approveOrder(){
    if(confirm('Are you sure to approve this order?')){
      let approveObservation = document.getElementById('approveObservations') as HTMLTextAreaElement;
      this.orderService.approveOrder(this.order, this.order.products,this.id,approveObservation.value).subscribe(()=>{
        this.router.navigate(['orders'])
      })
    }
  }

  denyOrder(){
    if(confirm('Are you sure to deny this order?')){
      let denyObservation = document.getElementById('approveObservations') as HTMLTextAreaElement;
      this.orderService.denyOrder(this.order, this.id, denyObservation.value).subscribe(()=>{
        this.router.navigate(['orders'])
      })
    }
  }
  

}
