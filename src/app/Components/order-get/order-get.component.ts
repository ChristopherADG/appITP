import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Order} from '../../Models/Order'
import {OrderService} from '../../Services/order.service';
import {AuthService} from '../../Services/auth.service'
declare var $;

@Component({
  selector: 'app-order-get',
  templateUrl: './order-get.component.html',
  styleUrls: ['./order-get.component.css']
})
export class OrderGetComponent implements OnInit {

  orders = [];
  ordersApprove = [];
  ordersDeny = [];

  dataTable: any;

  constructor(private orderService: OrderService, 
    private router: Router, private chRef: ChangeDetectorRef,
    private authService: AuthService) { }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders(){
    this.orderService.getOrders()
    .subscribe((data: Order[])=>{
      this.orders = [];
      this.ordersDeny = [];

      data.forEach(order => {
        if(order.status == '0'){
          this.orders.push(order)
        }
      });
      this.orderService.getApprovedOrdersByStaus(1).subscribe((data:[]) =>{
        this.ordersApprove = data
        this.chRef.detectChanges();
        const table2: any = $('#table2');
        table2.DataTable()
      })
      this.orderService.getApprovedOrdersByStaus(-1).subscribe((data:[]) =>{
        this.ordersDeny = data
        this.chRef.detectChanges();
        const table3: any = $('#table3');
        table3.DataTable()
      })
      this.chRef.detectChanges();
      const table: any = $('#table1');
      table.DataTable()
    })
  }

  hasPermition(){
    return this.authService.getRole() == 'Admin' || this.authService.getRole() == 'CEDIS'
  }

  editOrder(id){
    this.router.navigate([`/editOrder/${id}`]); 
  }
  
  detailOrder(id, statusId){
    this.router.navigate([`/detailOrder/${id}/${statusId}`]); 
  }

  deleteOrder(id){
    if(confirm('Are you sure to delete this record?')){
      this.orderService.deleteDinningRoom(id).subscribe(()=>{
        this.fetchOrders();
      })
    }
  }

}
