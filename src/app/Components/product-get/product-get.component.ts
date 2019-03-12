import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../Models/Product'
import {ProductService} from '../../Services/product.service';
import { CookieService } from 'ngx-cookie-service';
declare var $;

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private chRef: ChangeDetectorRef,  private cookieService: CookieService) { }

  products : Product[];

  dataTable: any;

  ngOnInit() {
    if(this.getRole()!="Admin"){
      this.router.navigate(['/orders']);
    };
    this.fetchProducts();
  }

  getRole(){
    const role = JSON.parse(this.cookieService.get('user')).role;
    return role;
  }

  fetchProducts(){
    this.productService.getProducts()
    .subscribe((data: Product[])=>{
      this.products = data;
      this.chRef.detectChanges();

      const table: any = $('table');
      this.dataTable = table.DataTable()
    })


  }

  editProduct(id){
    this.router.navigate([`/editProduct/${id}`]);
  }

  deleteProduct(id){
    if(confirm('Are you sure to delete this record?')){
      this.productService.deleteProduct(id).subscribe(()=>{
        this.fetchProducts();
      })
    }

  }


}
