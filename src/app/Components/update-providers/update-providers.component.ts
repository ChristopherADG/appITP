import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProviderService} from '../../provider.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {Provider} from '../../Provider';

@Component({
  selector: 'app-update-providers',
  templateUrl: './update-providers.component.html',
  styleUrls: ['./update-providers.component.css']
})
export class UpdateProvidersComponent implements OnInit {

  id:String;
  provider: any = {};
  updateForm: FormGroup;

  constructor(private providerService: ProviderService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.providerService.getProviderById(this.id).subscribe(res=>{
        this.provider = res;
        console.log("listo")
        this.updateForm.get('name').setValue(this.provider.name);
        this.updateForm.get('contact').setValue(this.provider.contact);
        this.updateForm.get('email').setValue(this.provider.email);
        this.updateForm.get('phonee').setValue(this.provider.phone);
        this.updateForm.get('rfc').setValue(this.provider.rfc);
        this.updateForm.get('pc').setValue(this.provider.pc);
        this.updateForm.get('street').setValue(this.provider.street);
        this.updateForm.get('number').setValue(this.provider.number);
        this.updateForm.get('ext_number').setValue(this.provider.ext_number);
        this.updateForm.get('colony').setValue(this.provider.colony);
      })
    })

  }

  createForm(){
    this.updateForm = this.fb.group({
      name: ['', Validators.required ],
      contact: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ],
      rfc: ['', Validators.required ],
      pc: ['', Validators.required ],
      street: ['', Validators.required ],
      number: ['', Validators.required ],
      ext_number: ['', Validators.required ],
      colony: ['', Validators.required ]
    });
  }


  updateProvider(name,contact,email,phone, rfc, pc,street, number, ext_number,colony){
    this.providerService.updateProvider(this.id,name,contact,email,phone, rfc, pc,street, number, ext_number,colony).subscribe(()=>{
      this.router.navigate(['/providers']);
    })
  }

}
