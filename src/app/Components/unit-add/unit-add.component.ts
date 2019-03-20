import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ProductService} from '../../Services/product.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'

@Component({
  selector: 'app-unit-add',
  templateUrl: './unit-add.component.html',
  styleUrls: ['./unit-add.component.css']
})
export class UnitAddComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  validatingForm: FormGroup;
  ngOnInit() {

    this.validatingForm = new FormGroup({
      unitName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)])
    });
  }

  get unitName() { return this.validatingForm.get('unitName'); }

  addUnit(name){
    this.productService.addUnit(name)
      .subscribe(()=>{
        this.router.navigate(['/units']);
      })
  }

}
