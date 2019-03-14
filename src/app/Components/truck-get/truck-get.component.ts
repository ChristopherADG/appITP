import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Truck} from '../../Models/Truck';
import {TruckService} from '../../Services/truck.service';
declare var $;

@Component({
  selector: 'app-truck-get',
  templateUrl: './truck-get.component.html',
  styleUrls: ['./truck-get.component.css']
})
export class TruckGetComponent implements OnInit {

  trucks : Truck[];
  dataTable: any;

  constructor(private truckService: TruckService, private router: Router, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchTrucks();
  }


  fetchTrucks(){
    this.truckService.getTruck()
    .subscribe((data: Truck[])=>{
      this.trucks = data;

      this.chRef.detectChanges();

      const table: any = $('table');
      this.dataTable = table.DataTable()
    })
  }
  editTruck(id){
    this.router.navigate([`/editTruck/${id}`]);
  }

  deleteTruck(id){
    if(confirm('Are you sure to delete this record?')){
      this.truckService.deleteTruck(id).subscribe(()=>{
        this.fetchTrucks();
      })
    }
  }
}
