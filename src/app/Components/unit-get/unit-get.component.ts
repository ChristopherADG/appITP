import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../Services/product.service';
import {Unit} from '../../Models/Unit';
declare var $;

@Component({
  selector: 'app-unit-get',
  templateUrl: './unit-get.component.html',
  styleUrls: ['./unit-get.component.css']
})
export class UnitGetComponent implements OnInit {

  units : Unit[];

  dataTable: any;

  constructor(private productService: ProductService, private router: Router, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchUnits()
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
    this.productService.deleteUnit(id).subscribe(()=>{
      this.fetchUnits();
    })
  }

}
