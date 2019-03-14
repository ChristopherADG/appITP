import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Provider} from '../../Models/Provider';
import {ProviderService} from '../../Services/provider.service';
declare var $;

@Component({
  selector: 'app-provider-get',
  templateUrl: './provider-get.component.html',
  styleUrls: ['./provider-get.component.css']
})
export class ProviderGetComponent implements OnInit {

  providers : Provider[];
  dataTable: any;

  constructor(private providerService: ProviderService, private router: Router, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchProviders();
  }


  fetchProviders(){
    this.providerService.getProvider()
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
    if(confirm('Are you sure to delete this record?')){
      this.providerService.deleteProvider(id).subscribe(()=>{
        this.fetchProviders();
      })
    }
  }
}
