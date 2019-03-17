import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Shipping} from '../../Models/Shipping'
import {ShippingService} from '../../Services/shipping.service';
declare var $;

@Component({
  selector: 'app-shipping-get',
  templateUrl: './shipping-get.component.html',
  styleUrls: ['./shipping-get.component.css']
})
export class ShippingGetComponent implements OnInit {

  constructor(private shippingService: ShippingService, private router: Router, private chRef: ChangeDetectorRef) { }

  shippings : Shipping[];

  dataTable: any;

  ngOnInit() {
    this.fetchShippings();
  }

  fetchShippings(){
    this.shippingService.getShippings() 
    .subscribe((data: Shipping[])=>{
      this.shippings = data;
      this.chRef.detectChanges();

      const table: any = $('table');
      this.dataTable = table.DataTable()
    })


  }

  editShipping(id){
    this.router.navigate([`/editShipping/${id}`]);
  }

  deleteShipping(id){
    if(confirm('Are you sure to delete this record?')){
      this.shippingService.deleteShipping(id).subscribe(()=>{
        this.fetchShippings();
      })
    }

  }


}
