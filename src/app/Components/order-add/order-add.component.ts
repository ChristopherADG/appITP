import { Component, OnInit ,ChangeDetectorRef, ElementRef} from '@angular/core';
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
   private router: Router, private cookieService: CookieService, private elRef:ElementRef) {

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
  isMobile(){
    return $(window).width() < 767
  }

  //NO SE TOCA
  ngOnInit() {
    console.log($(window).width())
    this.getDinningRooms()
    this.getCategories();
    let date = new Date();
    document.getElementById('date').innerText = date.toJSON().slice(0,10).replace(/-/g,'/')
    document.getElementById('time').innerText = date.toTimeString().substr(0,8)
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
        var category = document.getElementById("category"+index) as HTMLHeadElement;
        category.innerText = this.categories[index-1]
        // category.options.add(new Option(this.categories[index-1]))
        this.getProductsByCategory(this.categories[index-1],index)
      }
    })
  }

  titleShow(categoryField){
    return this.fields[categoryField-1].length > 0 && $(window).width() > 767
  }

  //DONE
  getUnits(categoryField, field){
    var select = document.getElementById("select"+field) as HTMLSelectElement;
    select.disabled =false;
    var provider = document.getElementById("provider"+field) as HTMLSelectElement;
    provider.disabled =false;
    var product = document.getElementById("product"+field) as HTMLSelectElement;
    //Limpiar el select
    while(select.options.length>1){
      select.options.remove(select.options.length-1)
    }
    //Limpiar el provider
    while(provider.options.length>1){
      provider.options.remove(provider.options.length-1)
    }
    this.categoryProducts[this.categoryFields.indexOf(categoryField)][product.selectedIndex-1].unit.forEach(unit => {
      select.options.add(new Option(unit.name))
    });
    //console.log(this.categoryProducts[this.categoryFields.indexOf(categoryField)][product.selectedIndex-1])
    this.categoryProducts[this.categoryFields.indexOf(categoryField)][product.selectedIndex-1].providers.forEach(providerArr => {
      provider.options.add(new Option(providerArr.name))
    });

    this.chRef.detectChanges();
  }

  test(){
    console.log("hola")
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
    let a = $('.chosen-select'+this.fieldsCont)
    a.select2();
    a.on('select2:select', function (e) {
      document.getElementById('helper'+e.target.id.replace("product","")).click()
    });
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
    //console.log(products)
    this.orderService.addOrder(selectedDR,description,products,0).subscribe(()=>{
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
        var provider = document.getElementById("provider"+field) as HTMLSelectElement;
        
        let tempProduct = this.categoryProducts[this.categoryFields.indexOf(category)][product.selectedIndex-1]
        let tempUnit = tempProduct.unit[select.selectedIndex-1]
        let tempProvider =  tempProduct.providers[provider.selectedIndex-1]

        let temp = {
          quantity: number.value,
          product: {
            id: tempProduct._id,
            name: tempProduct.name,
            category: tempProduct.category,
            description: tempProduct.description
          },
          unit: tempUnit,
          provider: tempProvider
        }
        arr.push(temp)
      })
    })
    return arr
  }
  



}
