import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import {ShippingService} from '../../Services/shipping.service'
import { from } from 'rxjs';
declare var $;

@Component({
  selector: 'app-deliveries-get',
  templateUrl: './deliveries-get.component.html',
  styleUrls: ['./deliveries-get.component.css']
})
export class DeliveriesGetComponent implements OnInit {

  constructor(private shippingService:ShippingService, private chDet : ChangeDetectorRef ) { }
  shippings = []
  comedores = []
  ordersByShipping = []
  dataTable: any;

  ngOnInit() {
    this.shippingService.getShippings().subscribe((data: [])=>{ 
      this.shippings = data;
      this.comedores = this.shippings.reduce((ant,current)=>{
        current.destiny.forEach(desti => {
          if(!ant.includes(desti)){
            ant.push(desti)
            this.ordersByShipping.push([])
          }
        })
        return ant
      }, [])
      this.shippings.forEach(current=>{
        if(current.status==1){
          current.products.forEach(deliverie=>{
            let ship = {
              id: current._id,
              date: current.date,
              time: current.time,
              truck: current.driverName,
              products: deliverie.products,
              status: deliverie.status
            }
            if(ship.status == undefined){
              ship.status = '1'
            }
            this.ordersByShipping[this.comedores.indexOf(deliverie.dinningRoom)].push(ship)
          })
        }
      })
      this.chDet.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable()
      
    })
  }



}
