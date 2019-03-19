import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ProductService} from '../../Services/product.service'
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }
  validatingForm: FormGroup;
  ngOnInit() {

    this.validatingForm = new FormGroup({
      categoryName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)])
    });
    
  }


  get categoryName() { return this.validatingForm.get('categoryName'); }
  addCategory(name){
    this.productService.addCategory(name)
      .subscribe(()=>{
        this.router.navigate(['/categories']);
      })
  }

}