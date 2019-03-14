import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {ProductService} from '../../Services/product.service'
import { Unit} from '../../Models/Unit'
import { Category} from '../../Models/Category'
import {ProviderService} from '../../Services/provider.service'
import {Provider} from '../../Models/Provider'
declare var $;

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, 
    private route: ActivatedRoute, private providerService: ProviderService,
    private chDetector: ChangeDetectorRef) { }

  id:String;
  product: any = {};
  units : Unit[];
  categories : Category[];
  providers : Provider[];
  providersCont=1;
  providerFields = [1]

  ngOnInit() {
    this.getUnits();
    this.getCategories();
    this.getProviders();
    this.route.params.subscribe(param =>{
      this.id = param.id;
      this.productService.getProductById(this.id).subscribe(res=>{
        this.product = res;
        let temp = document.getElementById('name') as HTMLInputElement
        temp.value =this.product.name
        let temp2 = document.getElementById('category') as HTMLInputElement
        temp2.value = this.product.category
        document.getElementById('textArea').innerText = this.product.description
        
        for (let index = 0; index < this.product.unit.length; index++) {
          let temp = document.getElementById(this.product.unit[index].name) as HTMLInputElement
          temp.checked = true;
        }
        for (let index = 1; index <= this.product.providers.length; index++) {
          if(index != 1){
            this.providerFields.push(index);
          }
          this.chDetector.detectChanges();
          var providerSelect = document.getElementById("provider"+index) as HTMLInputElement;
          providerSelect.value = this.product.providers[index-1].name
          this.chDetector.detectChanges();
          $(".chosen-select"+this.providersCont).select2()
        }
      })
    })
  }

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
        arr.push(tempUnit)
      }
    }
    return arr;
  }

  getUnits(){
    this.productService.getUnits()
    .subscribe((data: Unit[])=>{
      this.units = data;
    })
  }

  updateProduct(name,unit,category, description){
    let providers = this.getProvidersInfo()
    this.productService.updateProduct(this.id,name,unit,category,description, providers).subscribe(()=>{
      this.router.navigate(['/products']);
    })
  }

  getProvidersInfo(){
    let arr = []
    this.providerFields.forEach(providerId => {
      var providerSelect = document.getElementById("provider"+providerId) as HTMLSelectElement;
      arr.push(this.providers[providerSelect.selectedIndex-1])
    });
    return arr;
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

}
