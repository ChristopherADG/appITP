import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ProductService} from '../../Services/product.service';

@Component({
  selector: 'app-unit-add',
  templateUrl: './unit-add.component.html',
  styleUrls: ['./unit-add.component.css']
})
export class UnitAddComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

  addUnit(name){
    this.productService.addUnit(name)
      .subscribe(()=>{
        this.router.navigate(['/units']);
      })
  }

}
