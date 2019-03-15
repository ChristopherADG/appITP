import { Component, OnInit ,ChangeDetectorRef, ElementRef} from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {Product} from '../../Models/Product';
import {DinningRoomService} from '../../Services/dinning-room.service';
import {DinningRoom} from '../../Models/DinningRoom'
import {OrderService} from '../../Services/order.service'
import {Router, ActivatedRoute} from '@angular/router'
import {CookieService} from 'ngx-cookie-service'
declare var $;

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  constructor(private productService: ProductService, private chRef: ChangeDetectorRef
    ,private dinningRoomService: DinningRoomService, private orderService: OrderService,
    private router: Router, private cookieService: CookieService, private elRef:ElementRef,
    private route: ActivatedRoute) { }

  orderId : String
  order:any = {};
  dinningRoom:any = {};  

  categoryFields = []
  fields = [[]]
  categoryCont = 1;
  fieldsCont= 1;
  categoryProducts : any = [[]]
  availableDinningRooms : DinningRoom[]
  categories = []
  band = false;

  ngOnInit() {
    this.route.params.subscribe(param =>{
      this.orderId = param.id;
      this.orderService.getOrderById(this.orderId).subscribe((order)=>{
         this.order = order;
         if(this.order.status != '0'){
          this.router.navigate(['/orders']);
         }
         console.log(this.order)
         this.chRef.detectChanges();
         document.getElementById('date').innerText = this.order.date
         document.getElementById('time').innerText = this.order.time
         document.getElementById('dinningRoom').innerText = this.order.dinningRoom.name
         document.getElementById('observations').innerText = this.order.description
         this.getCategories();
         this.chRef.detectChanges();
         
      })
    })
  }

  backDetaild(){
    this.router.navigate([`/detailOrder/${this.orderId}/${this.order.status}`])
  }

  writeFieldsInfo(){
    for (let index = 0; index < this.order.products.length; index++) {
      let currentProduct = this.order.products[index]
      //console.log(currentProduct)
      let category = currentProduct.product.category
      let indexCategory = this.categories.indexOf(category)
      this.addField(indexCategory+1);
      let a = $('.chosen-select'+this.fieldsCont);
      a.val(currentProduct.product.name).trigger("change");
      document.getElementById('helper'+this.fieldsCont).click();
      let units = document.getElementById("select"+this.fieldsCont) as HTMLSelectElement;
      units.value = currentProduct.unit.name;
      let provider = document.getElementById("provider"+this.fieldsCont) as HTMLSelectElement;
      provider.value = currentProduct.provider.name;
      let quantity = document.getElementById("number"+this.fieldsCont) as HTMLInputElement;
      quantity.value = currentProduct.quantity
    }
  }

  isMobile(){
    return $(window).width() < 767
  }
  titleShow(categoryField){
    return this.fields[categoryField-1].length > 0 && $(window).width() > 767
  }

  getCategories(){
    this.productService.getCategory().subscribe((data:any[]) =>{
      //console.log(data);
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
        this.getProductsByCategory(this.categories[index-1],index)
      }
      
    })
  }

  getProductsByCategory(name, categoryField){
    this.categoryProducts[this.categoryFields.indexOf(categoryField)] = []
    this.productService.getProductByCategory(name).subscribe((data:Product[])=>{
      this.categoryProducts[this.categoryFields.indexOf(categoryField)]= data;
      //console.log(this.categoryProducts[this.categoryFields.indexOf(categoryField)])
      this.chRef.detectChanges();
      if(categoryField == this.categories.length){
        this.writeFieldsInfo();
      }
    })
  }

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
    //console.log(product.selectedIndex-1)
    this.categoryProducts[this.categoryFields.indexOf(categoryField)][product.selectedIndex-1].unit.forEach(unit => {
      select.options.add(new Option(unit.name))
    });
    //console.log(this.categoryProducts[this.categoryFields.indexOf(categoryField)][product.selectedIndex-1])
    this.categoryProducts[this.categoryFields.indexOf(categoryField)][product.selectedIndex-1].providers.forEach(providerArr => {
      provider.options.add(new Option(providerArr.name))
    });

    this.chRef.detectChanges();
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
            category: tempProduct.category
          },
          unit: tempUnit,
          provider: {
            id: tempProvider._id,
            name: tempProvider.name
          }
        }
        arr.push(temp)
      })
    })
    return arr
  }

  approveOrder(){
    if(confirm('Are you sure to approve this order?')){
      let newProducts = this.getFieldsInfo();
      let approveObservation = document.getElementById('approveObservations') as HTMLTextAreaElement;
      console.log(newProducts, approveObservation.value)
      this.orderService.approveOrder(this.order, newProducts,this.orderId,approveObservation.value).subscribe(()=>{
        this.router.navigate(['orders'])
      })
    }
  }

}
