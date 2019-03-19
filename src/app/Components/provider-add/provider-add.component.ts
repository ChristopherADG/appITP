import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ProviderService} from '../../Services/provider.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'

@Component({
  selector: 'app-provider-add',
  templateUrl: './provider-add.component.html',
  styleUrls: ['./provider-add.component.css']
})
export class ProviderAddComponent implements OnInit {

  constructor(private providerService: ProviderService, private router: Router) { }
  validatingForm: FormGroup;

  ngOnInit() {

    this.validatingForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      contact: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^[2-9]{2}\d{8}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      rfc: new FormControl(null, [Validators.required, Validators.pattern(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)]),
      street: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      ext_number: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      colony: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      pc: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{5}$/)])
      
    });
  }

  get valid_name() { return this.validatingForm.get('name'); }
  get valid_contact() { return this.validatingForm.get('contact'); }
  get valid_phone() { return this.validatingForm.get('phone'); }
  get valid_email() { return this.validatingForm.get('email'); }
  get valid_rfc() { return this.validatingForm.get('rfc'); }
  get valid_street() { return this.validatingForm.get('street'); }
  get valid_number() { return this.validatingForm.get('number'); }
  get valid_ext_number() { return this.validatingForm.get('ext_number'); }
  get valid_colony() { return this.validatingForm.get('colony'); }
  get valid_pc() { return this.validatingForm.get('pc'); }
  

  addProvider(name,contact,phone,email,rfc,pc,street,number,ext_number,colony){
    console.log(name,contact,phone,email,rfc,pc,street,number,ext_number,colony)
    this.providerService.addProvider(name,contact,phone,email,rfc,pc,street,number,ext_number,colony)
      .subscribe(()=>{
        this.router.navigate(['/providers']);
      })
  }

}
