import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import {Provider} from '../../Provider';
import {ProviderService} from '../../provider.service';
declare var $;

@Component({
  selector: 'app-get-providers',
  templateUrl: './get-providers.component.html',
  styleUrls: ['./get-providers.component.css']
})
export class GetProvidersComponent implements OnInit {

  providers : Provider[];
  disColumns = ["name","contact","email","phone", "rfc", "pc","street", "number", "ext_number","colony","actions"];
  
  dataTable: any;  

  constructor(private providerService: ProviderService, private router: Router, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  fetchProviders(){
    this.providerService.getProviders()
    .subscribe((data: Provider[])=>{
      this.providers = data;

      this.chRef.detectChanges();
      
      const table: any = $('table');
      this.dataTable = table.DataTable()
    })
    
  }

  editProvider(id){
    this.router.navigate([`/editProvider/${id}`]); 
  }

  deleteProvider(id){
    this.providerService.deleteProvider(id).subscribe(()=>{
      this.fetchProviders();
    })
  }

}
