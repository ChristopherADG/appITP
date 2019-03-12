import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../Services/product.service';
import {Unit} from '../../Models/Unit';
import { CookieService } from 'ngx-cookie-service';
declare var $;

@Component({
  selector: 'app-unit-get',
  templateUrl: './unit-get.component.html',
  styleUrls: ['./unit-get.component.css']
})
export class UnitGetComponent implements OnInit {

  units : Unit[];

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
    this.productService.getUnits()
    .subscribe((data: Unit[])=>{
      this.units = data;
      this.chRef.detectChanges();

      const table: any = $('table');
      this.dataTable = table.DataTable()
    })
  }

  deleteUnit(id){
    if(confirm('Are you sure to delete this record?')){
      this.productService.deleteUnit(id).subscribe(()=>{
        this.fetchUnits();
      })
    }
  }

}
