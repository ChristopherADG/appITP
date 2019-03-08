import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router'
import {Unit} from '../../Models/Unit';
import {ProductService} from '../../Services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getUnits();
  }
  units : Unit[];

  getUnits(){
    this.productService.getUnits()
    .subscribe((data: Unit[])=>{
      this.units = data;
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

  addProduct(name, unit, category, description){
    this.productService.addProduct(name,unit,category, description)
      .subscribe(()=>{
        this.router.navigate(['/products']);
      })
  }

}
