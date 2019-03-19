import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router'
import {Unit} from '../../Models/Unit';
import {ProductService} from '../../Services/product.service';
import {Category} from '../../Models/Category';
import {ProviderService} from '../../Services/provider.service'
import {Provider} from '../../Models/Provider'
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
declare var $;
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router,
    private providerService: ProviderService, private chDetector: ChangeDetectorRef) { }

    validatingForm: FormGroup;

  ngOnInit() {
    this.getUnits();
    this.getCategories();
    this.getProviders();
    //------------------VALIDATIONS----------------------//
    this.validatingForm = new FormGroup({
      valid_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]),
    });
  }

  get v_name() { return this.validatingForm.get('valid_name'); }

//------------------VALIDATIONS----------------------//
  providersCont=1;
  providerFields = [1]
  units : Unit[];
  categories : Category[];
  providers : Provider[];

  getCategories(){
    this.productService.getCategory()
    .subscribe((data: Category[])=>{
      this.categories = data
      //console.log(this.categories)
    })
  }

  getProviders(){
    this.providerService.getProvider()
    .subscribe((data: Provider[])=>{
      this.providers = data
      this.chDetector.detectChanges();
      $(".chosen-select"+this.providersCont).select2()
    })
  }
  
  addProviderField(){
    this.providersCont++;
    this.providerFields.push(this.providersCont);
    this.chDetector.detectChanges();
    $(".chosen-select"+this.providersCont).select2()

  }

  lastField(field){
    return  this.providerFields.length > 1  
  }

  removeField(field){
    let fieldIndex = this.providerFields.indexOf(field)
    this.providerFields.splice(fieldIndex, 1);
  }

  getUnits(){
    this.productService.getUnits()
    .subscribe((data: Unit[])=>{
      this.units = data;
      //console.log(this.units)
    })
  }

  arrayUnit(){
    let arr = [];
    for (let index = 0; index < this.units.length; index++) {
      var temp = document.getElementById(this.units[index].name.toString()) as HTMLInputElement;
      if(temp.checked){
        let tempUnit = {
          id: temp.value,
          name: this.units[index].name.toString()
        }
        //console.log(tempUnit)
        arr.push(tempUnit)
      }
    }
    return arr;
  }
  getProvidersInfo(){
    let arr = []
    this.providerFields.forEach(providerId => {
      var providerSelect = document.getElementById("provider"+providerId) as HTMLSelectElement;
      arr.push(this.providers[providerSelect.selectedIndex-1])
    });
    return arr;
  }

  addProduct(name, unit, category, description){
    let providers = this.getProvidersInfo()
    this.productService.addProduct(name,unit,category, description, providers)
      .subscribe(()=>{
        this.router.navigate(['/products']);
      })
  }

}
