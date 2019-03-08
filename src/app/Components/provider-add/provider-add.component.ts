import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ProviderService} from '../../Services/provider.service';

@Component({
  selector: 'app-provider-add',
  templateUrl: './provider-add.component.html',
  styleUrls: ['./provider-add.component.css']
})
export class ProviderAddComponent implements OnInit {

  constructor(private providerService: ProviderService, private router: Router) { }

  ngOnInit() {
  }

  addProvider(name,contact,phone,email,rfc,pc,street,number,ext_number,colony){
    console.log(name,contact,phone,email,rfc,pc,street,number,ext_number,colony)
    this.providerService.addProvider(name,contact,phone,email,rfc,pc,street,number,ext_number,colony)
      .subscribe(()=>{
        this.router.navigate(['/providers']);
      })
  }

}
