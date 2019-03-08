import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../Models/Product'
import {ProductService} from '../../Services/product.service';
declare var $;

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private chRef: ChangeDetectorRef) { }

  products : Product[];
  disColumns = ["name", "lastName", "email", "password", "actions"];

  dataTable: any;

  ngOnInit() {
    this.fetchProducts();
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
    this.productService.deleteProduct(id).subscribe(()=>{
      this.fetchProducts();
    })
  }


}
