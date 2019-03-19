import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Shipping} from '../../Models/Shipping'
import {Order} from '../../Models/Order'
import {ShippingService} from '../../Services/shipping.service'
import {OrderService} from '../../Services/order.service'
import {TruckService} from '../../Services/truck.service'
import { Truck } from 'src/app/Models/Truck';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-shipping-add',
  templateUrl: './shipping-add.component.html',
  styleUrls: ['./shipping-add.component.css']
})
export class ShippingAddComponent implements OnInit {

  trucks : Truck[];
  approvedOrders = []
  availableDinningRooms = []
  productsByDinningRoom = []
  destinations = []

  constructor(private truckService : TruckService, private chDetect: ChangeDetectorRef,
    private orderService: OrderService, private shippingService: ShippingService,
    private router: Router) { }

  ngOnInit() {
    this.getTrucks();
    this.getDinningRooms();
  }

  getTrucks(){
    this.truckService.getTruck().subscribe((trucks: Truck[])=>{
      this.trucks = trucks;
      //console.log(this.trucks)
      this.chDetect.detectChanges();
    })
  }

  getDinningRooms(){
    this.orderService.getApprovedOrdersByStaus(1).subscribe((orders: []) =>{
      this.approvedOrders = orders;
      //console.log(this.approvedOrders)
      this.approvedOrders.forEach(order => {
        if(!this.availableDinningRooms.includes(order.dinningRoom.name)){
          this.availableDinningRooms.push(order.dinningRoom.name)
        }
      });
      this.chDetect.detectChanges()
      let select = $('.select-multi');
      select.select2();
      select.on('change', function (e) {
        document.getElementById('helper').click()
      });
    })
  }

  setDestinations(){
    this.destinations = []
    this.productsByDinningRoom = []
    let select = $('.select-multi');
    let data = select.select2('data');

    data.forEach(option => {
      this.destinations.push(option.text);
      this.productsByDinningRoom.push([])
    });

    this.approvedOrders.forEach(order => {
      if(this.destinations.includes(order.dinningRoom.name)){
        this.productsByDinningRoom[this.destinations.indexOf(order.dinningRoom.name)].push(order)
      }
    });
    this.chDetect.detectChanges();
  }

  createShipping(){
    let productsFinal =[]
    this.destinations.forEach(dinningRoom => {
      let products =[]
      this.productsByDinningRoom[this.destinations.indexOf(dinningRoom)].forEach(order => {
        let productSub = order.products
          order.products.forEach(product => {
            if(product.status == 0){
              let productC = document.getElementById('checkbox_'+this.destinations.indexOf(dinningRoom)+'_'+this.productsByDinningRoom[this.destinations.indexOf(dinningRoom)].indexOf(order)+'_'+order.products.indexOf(product)) as HTMLInputElement
              if(productC.checked == true){
                let productP = this.approvedOrders[this.approvedOrders.indexOf(order)].products[order.products.indexOf(product)];
                let temp ={
                  product: productP.product,
                  unit: productP.unit,
                  quantity: productP.quantity
                }
                products.push(temp);
                productSub[order.products.indexOf(product)].status = 1
              }
            }
          });
          this.orderService.updateProduct(order._id, productSub).subscribe()
      });
      productsFinal.push({dinningRoom: dinningRoom, products: products}) 
    });
    return productsFinal;
  }

  addShipping(){
    let truckSelect = document.getElementById('truck') as HTMLInputElement
    this.shippingService.addShipping(truckSelect.value, this.createShipping(), this.destinations).subscribe(()=>{
      this.router.navigate(['/shippings']);
    })
  }

}



