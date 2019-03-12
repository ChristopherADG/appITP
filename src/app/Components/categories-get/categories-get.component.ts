import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../Services/product.service';
import {Category} from '../../Models/Category';
import { CookieService } from 'ngx-cookie-service';

declare var $;

@Component({
  selector: 'app-categories-get',
  templateUrl: './categories-get.component.html',
  styleUrls: ['./categories-get.component.css']
})
export class CategoriesGetComponent implements OnInit {

  category : Category[];

  dataTable: any;

  constructor(private productService: ProductService, private router: Router, private chRef: ChangeDetectorRef,  private cookieService: CookieService) { }

  ngOnInit() {
    if(this.getRole()!="Admin"){
      this.router.navigate(['/orders']);
    };
    this.fetchUnits()
  }

  getRole(){
    const role = JSON.parse(this.cookieService.get('user')).role;
    return role;
  }

  fetchUnits(){
    this.productService.getCategory()
    .subscribe((data: Category[])=>{
      this.category = data;
      this.chRef.detectChanges();

      const table: any = $('table');
      this.dataTable = table.DataTable()
    })
  }

  deleteCategory(id){
    if(confirm('Are you sure to delete this record?')){
      this.productService.deleteCategory(id).subscribe(()=>{
        this.fetchUnits();
      })
    }
  }

}
