import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ProductService} from '../../Services/product.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {

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
  
  addCategory(name){
    this.productService.addCategory(name)
      .subscribe(()=>{
        this.router.navigate(['/categories']);
      })
  }

}
