import { Component, OnInit } from '@angular/core';
import {ShippingService} from '../../Services/shipping.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-deliveries-get',
  templateUrl: './deliveries-get.component.html',
  styleUrls: ['./deliveries-get.component.css']
})
export class DeliveriesGetComponent implements OnInit {

  constructor(private shippingService:ShippingService ) { }
  shippings = []
  comedores = []

  ngOnInit() {
    this.shippingService.getShippings().subscribe((data: [])=>{ 
      this.shippings = data;
      console.log(this.shippings)
      this.comedores = this.shippings.reduce((ant,current)=>{
        current.destiny.forEach(desti => {
          if(!ant.includes(desti)){
            ant.push(desti)
          }
        })
        return ant
      }, [])
    })
  }



}
