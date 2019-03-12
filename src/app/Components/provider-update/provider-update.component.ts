import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {ProviderService} from '../../Services/provider.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-provider-update',
  templateUrl: './provider-update.component.html',
  styleUrls: ['./provider-update.component.css']
})
export class ProviderUpdateComponent implements OnInit {

  id:String;
  provider: any = {};

  constructor(private providerService: ProviderService, private router: Router, private route: ActivatedRoute,  private cookieService: CookieService) { }

  ngOnInit() {
    if(this.getRole()!="Admin"){
      this.router.navigate(['/orders']);
    }
    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.providerService.getProviderById(this.id).subscribe(res=>{
        this.provider = res;
        let temp = document.getElementById('name') as HTMLInputElement
        temp.value =this.provider.name
        let temp2 = document.getElementById('contact') as HTMLInputElement
        temp2.value =this.provider.contact
        let temp3 = document.getElementById('phone') as HTMLInputElement
        temp3.value =this.provider.phone
        let temp4 = document.getElementById('email') as HTMLInputElement
        temp4.value =this.provider.email
        let temp5 = document.getElementById('rfc') as HTMLInputElement
        temp5.value =this.provider.rfc
        let temp6 = document.getElementById('street') as HTMLInputElement
        temp6.value =this.provider.street
        let temp7 = document.getElementById('number') as HTMLInputElement
        temp7.value =this.provider.number
        let temp8 = document.getElementById('ext_number') as HTMLInputElement
        temp8.value =this.provider.ext_number
        let temp9 = document.getElementById('colony') as HTMLInputElement
        temp9.value =this.provider.colony
        let temp10 = document.getElementById('pc') as HTMLInputElement
        temp10.value =this.provider.pc
      })
    })
  }

  getRole(){
    const role = JSON.parse(this.cookieService.get('user')).role;
    return role;
  }

  updateProvider(name,contact,phone,email,rfc,pc,street,number,ext_number,colony){
    this.providerService.updateProvider(this.id,name,contact,phone,email,rfc,pc,street,number,ext_number,colony).subscribe(()=>{
      this.router.navigate(['/providers']);
    })
  }

}
