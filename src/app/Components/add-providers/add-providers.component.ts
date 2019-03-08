import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ProviderService} from '../../provider.service';
//import { Provider } from '@angular/core/src/render3/jit/compiler_facade_interface';

@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styleUrls: ['./add-providers.component.css']
})
export class AddProvidersComponent implements OnInit {

  constructor(private providerService: ProviderService, private router: Router) { }

  ngOnInit() {
  }

  addProvider(name,contact, email,phone, rfc, pc,street, number, ext_number,colony){
    this.providerService.addProvider(name,contact,email,phone, rfc, pc,street, number, ext_number,colony)
      .subscribe(()=>{
        this.router.navigate(['/providers']);
      })
  }

}
