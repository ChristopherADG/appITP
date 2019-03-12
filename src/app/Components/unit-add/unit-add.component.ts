import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ProductService} from '../../Services/product.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-unit-add',
  templateUrl: './unit-add.component.html',
  styleUrls: ['./unit-add.component.css']
})
export class UnitAddComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router,  private cookieService: CookieService) { }

  ngOnInit() {
    if(this.getRole()!="Admin"){
      this.router.navigate(['/orders']);
    }
  }

  getRole(){
    const role = JSON.parse(this.cookieService.get('user')).role;
    return role;
  }
  
  addUnit(name){
    this.productService.addUnit(name)
      .subscribe(()=>{
        this.router.navigate(['/units']);
      })
  }

}
