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

  orders : Order[];

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

  deleteOrder(id){
    if(confirm('Are you sure to delete this record?')){
      this.orderService.deleteDinningRoom(id).subscribe(()=>{
        this.fetchOrders();
      })
    }
  }

}
