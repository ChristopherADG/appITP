import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {Unit} from '../../Models/Unit';
import {ProductService} from '../../Services/product.service';
import {Category} from '../../Models/Category'

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getUnits();
    this.getCategories();
  }
  units : Unit[];
  categories : Category[];

  getCategories(){
    this.productService.getCategory()
    .subscribe((data: Category[])=>{
      this.categories = data
      //console.log(this.categories)
    })
  }

  getUnits(){
    this.productService.getUnits()
    .subscribe((data: Unit[])=>{
      this.units = data;
      //console.log(this.units)
    })
  }

  arrayUnit(){
    let arr = [];
    for (let index = 0; index < this.units.length; index++) {
      var temp = document.getElementById(this.units[index].name.toString()) as HTMLInputElement;
      if(temp.checked){
        let tempUnit = {
          id: temp.value,
          name: this.units[index].name.toString()
        }
        //console.log(tempUnit)
        arr.push(tempUnit)
      }
    }
    return arr;
  }

  addProduct(name, unit, category, description){
    this.productService.addProduct(name,unit,category, description)
      .subscribe(()=>{
        this.router.navigate(['/products']);
      })
  }

}
