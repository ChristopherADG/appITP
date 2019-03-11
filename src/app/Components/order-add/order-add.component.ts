import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {Product} from '../../Models/Product';
import {DinningRoomService} from '../../Services/dinning-room.service';
import {DinningRoom} from '../../Models/DinningRoom'
import {OrderService} from '../../Services/order.service'
import {Router} from '@angular/router'
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  fields = []
  cont = 0
  products: Product[];
  availableDinningRooms : DinningRoom[]
  availableUnits = []
  //Todas las unidades de los productos en arreglo
  
  constructor(private productService: ProductService, private chRef: ChangeDetectorRef
   ,private dinningRoomService: DinningRoomService, private orderService: OrderService,
   private router: Router, private cookieService: CookieService) {

  }

  getDinningRooms(){
    let user = JSON.parse(this.cookieService.get('user')) ;
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

  getUnits(id){
    var select = document.getElementById("select"+id) as HTMLSelectElement;
    var product = document.getElementById("product"+id) as HTMLSelectElement;
    //Limpiar el select
    while(select.options.length>0){
      select.options.remove(select.options.length-1)
    }
    this.availableUnits[product.selectedIndex-1].forEach(unit => {
      select.options.add(new Option(unit.name,unit.id))
    });
    this.chRef.detectChanges();
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
    let selectedDR = this.availableDinningRooms[dinningRoom.selectedIndex]
    let temp = {
      id : selectedDR._id,
      name: selectedDR.name
    }
    this.orderService.addOrder(temp,description,products,0).subscribe(()=>{
      this.router.navigate(['/orders']);
    })
  }
    
  getFieldsInfo(){
    let arr = []
    this.fields.forEach(field => {
      var select = document.getElementById("select"+field) as HTMLSelectElement;
      var number = document.getElementById("number"+field) as HTMLInputElement;
      var product = document.getElementById("product"+field) as HTMLSelectElement;

      
      let tempProduct = this.products[product.selectedIndex-1]
      let tempUnit = tempProduct.unit[select.selectedIndex]
      let temp = {
        quantity: number.value,
        product: {
          id: tempProduct._id,
          name: tempProduct.name,
          category: tempProduct.category,
          description: tempProduct.description
        },
        unit: tempUnit
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
