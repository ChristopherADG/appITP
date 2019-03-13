import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {Product} from '../../Models/Product';
import {DinningRoomService} from '../../Services/dinning-room.service';
import {DinningRoom} from '../../Models/DinningRoom'
import {OrderService} from '../../Services/order.service'
import {Router} from '@angular/router'
import {CookieService} from 'ngx-cookie-service'
declare var $;

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {


  categoryFields = []
  fields = [[]]
  categoryCont = 1;
  fieldsCont= 1;
  categoryProducts : any = [[]]
  availableDinningRooms : DinningRoom[]
  categories = []

  constructor(private productService: ProductService, private chRef: ChangeDetectorRef
   ,private dinningRoomService: DinningRoomService, private orderService: OrderService,
   private router: Router, private cookieService: CookieService) {

  }
  //DONE
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

  //NO SE TOCA
  ngOnInit() {
    this.getDinningRooms()
    this.getCategories();
  }
  getCategories(){
    this.productService.getCategory().subscribe((data:any[]) =>{
      for (let index = 0; index < data.length; index++) {
        this.categories.push(data[index].name)
      }
      for (let index = 1; index <= this.categories.length; index++) {
        this.categoryFields.push(index)
        this.categoryProducts.push([])
        this.fields.push([])
        this.chRef.detectChanges();
        var category = document.getElementById("category"+index) as HTMLSelectElement;
        category.options.add(new Option(this.categories[index-1]))
        this.getProductsByCategory(this.categories[index-1],index)
      }
    })
  }

  //DONE
  getUnits(categoryField, field){
    var select = document.getElementById("select"+field) as HTMLSelectElement;
    select.disabled =false;
    var product = document.getElementById("product"+field) as HTMLSelectElement;
    //Limpiar el select
    while(select.options.length>0){
      select.options.remove(select.options.length-1)
    }
    //console.log(this.categoryProducts[this.categoryFields.indexOf(categoryField)][product.selectedIndex-1])
    var select = document.getElementById("select"+field) as HTMLSelectElement;
    this.categoryProducts[this.categoryFields.indexOf(categoryField)][product.selectedIndex-1].unit.forEach(unit => {
      select.options.add(new Option(unit.name))
    });
    this.chRef.detectChanges();
  }
  //DONE
  getProductsByCategory(name, categoryField){
    this.categoryProducts[this.categoryFields.indexOf(categoryField)] = []
    this.productService.getProductByCategory(name).subscribe((data:Product[])=>{
      this.categoryProducts[this.categoryFields.indexOf(categoryField)]= data;
      //console.log(this.categoryProducts[this.categoryFields.indexOf(categoryField)])
      this.chRef.detectChanges();
    })
  }

  //USER INFERFACE
  //DONE
  addField(categoryField){
    this.fieldsCont++;
    this.fields[this.categoryFields.indexOf(categoryField)].push(this.fieldsCont);
    this.chRef.detectChanges();
   
  }
  //DONE
  lastItem(categoryField){
    return  this.fields[this.categoryFields.indexOf(categoryField)].length > 0 
  }
  //DONE
  removeField(categoryField, field){
    let categoryIndex = this.categoryFields.indexOf(categoryField)
    let fieldIndex = this.fields.indexOf(field)
    this.fields[categoryIndex].splice(fieldIndex, 1);
  }
  //DONE
  greaterThanProductsForCategory(categoryField){
    //console.log(this.fields[this.categoryFields.indexOf(categoryField)])
    return this.fields[this.categoryFields.indexOf(categoryField)].length >= 
              this.categoryProducts[this.categoryFields.indexOf(categoryField)].length
  }
  //DONE
  greaterThanCategory(){
    return  this.categoryFields.length >= this.categories.length
  }

  addOrder(dinningRoom,description,products){
    let selectedDR = this.availableDinningRooms[dinningRoom.selectedIndex]
    let temp = {
      id : selectedDR._id,
      name: selectedDR.name
    }
    //console.log(products)
    this.orderService.addOrder(temp,description,products,0).subscribe(()=>{
      this.router.navigate(['/orders']);
    })
  }
    
  getFieldsInfo(){
    let arr = []
    this.categoryFields.forEach(category =>{
      this.fields[this.categoryFields.indexOf(category)].forEach(field=>{
        var select = document.getElementById("select"+field) as HTMLSelectElement;
        var number = document.getElementById("number"+field) as HTMLInputElement;
        var product = document.getElementById("product"+field) as HTMLSelectElement;

        let tempProduct = this.categoryProducts[this.categoryFields.indexOf(category)][product.selectedIndex-1]
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
      })
    })
    return arr
  }
  



}
