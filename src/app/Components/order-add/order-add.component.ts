import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {Product} from '../../Models/Product';
import {DinningRoomService} from '../../Services/dinning-room.service';
import {DinningRoom} from '../../Models/DinningRoom'
import {OrderService} from '../../Services/order.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  fields = []
  cont = 0
  products: Product[];
  availableDinningRooms : DinningRoom[]
  availableUnits = []
  constructor(private productService: ProductService, private chRef: ChangeDetectorRef
   ,private dinningRoomService: DinningRoomService, private orderService: OrderService,
   private router: Router) {

  }

  getDinningRooms(){
    let user = JSON.parse(localStorage.getItem('user')) ;
    console.log(user)
    if(user.role == "Admin"){
      this.dinningRoomService.getDinningRooms().subscribe((data: DinningRoom[])=>{
        this.availableDinningRooms = data;
        this.chRef.detectChanges();
      })
    }else{
      this.dinningRoomService.getAvailableDinningRooms(user.id).subscribe((data: DinningRoom[])=>{
        this.availableDinningRooms = data;
        this.chRef.detectChanges();
      })
    }
  }

  getAvailableUnits(){
    for (let index = 0; index < this.products.length; index++) {
      this.availableUnits.push(this.products[index].unit)
    }
  }

  getUnits(productName, id){
    var select = document.getElementById("select"+id) as HTMLSelectElement;
    while(select.options.length>0){
      select.options.remove(select.options.length-1)
    }
    let temp;
    for (let index = 0; index < this.products.length; index++) {
      if(this.products[index].name == productName){
        temp = index;
      }
    }
    this.availableUnits[temp].forEach(unit => {
      select.options.add(new Option(unit))
    });
    this.chRef.detectChanges();
  }

  getProduct(productName){
    for (let index = 0; index < this.products.length; index++) {
      if(this.products[index].name == productName){
        return this.products[index]
      }
    }
  }

  ngOnInit() {
    this.getProducts();
    this.getDinningRooms()
    
  }

  getProducts(){
    this.productService.getProducts()
    .subscribe((data: Product[])=>{
      this.products = data;
      this.cont++;
      this.fields.push(this.cont)
      this.chRef.detectChanges();
      this.getAvailableUnits()
    })
  }

  addField(){
    this.cont++;
    let temp = Array.of(this.cont)
    this.fields = this.fields.concat(temp)
  }

  addOrder(dinningRoom,description,products){
    this.orderService.addOrder(dinningRoom,description,products,0).subscribe(()=>{
      this.router.navigate(['/orders']);
    })
  }
    
  getFieldsInfo(){
    let arr = []
    this.fields.forEach(field => {
      var select = document.getElementById("select"+field) as HTMLInputElement;
      var number = document.getElementById("number"+field) as HTMLInputElement;
      var product = document.getElementById("product"+field) as HTMLInputElement;

      let temp = {
        quantity: number.value,
        product: this.getProduct(product.value),
        unit: select.value
      }
      arr.push(temp)
    });

    return arr
  }

  removeField(id){
    let index = this.fields.indexOf(id)
    this.fields.splice(index, 1);
  }

  lastItem(){
    return  this.fields.length > 1 ? true : false
  }


}
