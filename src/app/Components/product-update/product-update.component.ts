import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {ProductService} from '../../Services/product.service'
import { Unit} from '../../Models/Unit'

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  id:String;
  product: any = {};
  units : Unit[];

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUnits();
    this.route.params.subscribe(param =>{
      this.id = param.id;
      this.productService.getProductById(this.id).subscribe(res=>{
        this.product = res;
        let temp = document.getElementById('name') as HTMLInputElement
        temp.value =this.product.name
        let temp2 = document.getElementById('category') as HTMLInputElement
        temp2.value = this.product.category
        document.getElementById('textArea').innerText = this.product.description
        
        for (let index = 0; index < this.product.unit.length; index++) {
          let temp = document.getElementById(this.product.unit[index].toString()) as HTMLInputElement
          temp.checked = true;
        }
        
      })
    })
  }
  arrayUnit(){
    let arr = [];
    for (let index = 0; index < this.units.length; index++) {
      var temp = document.getElementById(this.units[index].name.toString()) as HTMLInputElement;
      if(temp.checked){
        arr.push(this.units[index].name.toString())
      }
    }
    return arr;
  }

  getUnits(){
    this.productService.getUnits()
    .subscribe((data: Unit[])=>{
      this.units = data;
    })
  }

  updateProduct(name,unit,category, description){
    this.productService.updateProduct(this.id,name,unit,category,description).subscribe(()=>{
      this.router.navigate(['/products']);
    })
  }

}
