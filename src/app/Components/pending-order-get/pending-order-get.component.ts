import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Order} from '../../Models/Order'
import {OrderService} from '../../Services/order.service';
import {AuthService} from '../../Services/auth.service'
declare var $;

@Component({
  selector: 'app-pending-order-get',
  templateUrl: './pending-order-get.component.html',
  styleUrls: ['./pending-order-get.component.css']
})
export class PendingOrderGetComponent implements OnInit {

  orders : Order[];

  dataTable: any;

  constructor(private orderService: OrderService, 
    private router: Router, private chRef: ChangeDetectorRef,
    private authService: AuthService) { }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders(){
    this.orderService.getOrdersByStatus(0)
    .subscribe((data: Order[])=>{
      this.orders = data;
      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable()
    })
  }

  hasPermition(){
    return this.authService.getRole() == 'Admin' || this.authService.getRole() == 'CEDIS'
  }

  editOrder(id){
    this.router.navigate([`/editOrder/${id}`]); 
  }

  approveOrder(id){
    if(confirm('Are you sure to approve this order?')){
      this.orderService.approveOrder(id).subscribe(()=>{
        this.fetchOrders();
      })
    }
  }

  denyOrder(id){
    if(confirm('Are you sure to deny this order?')){
      this.orderService.denyOrder(id).subscribe(()=>{
        this.fetchOrders();
      })
    }
  }

  deleteOrder(id){
    if(confirm('Are you sure to delete this record?')){
      this.orderService.deleteDinningRoom(id).subscribe(()=>{
        this.fetchOrders();
      })
    }
  }

}
