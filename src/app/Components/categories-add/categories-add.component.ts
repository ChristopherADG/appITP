import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ProductService} from '../../Services/product.service';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

  addCategory(name){
    this.productService.addCategory(name)
      .subscribe(()=>{
        this.router.navigate(['/categories']);
      })
  }

}