import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {TruckService} from '../../Services/truck.service';

@Component({
  selector: 'app-truck-update',
  templateUrl: './truck-update.component.html',
  styleUrls: ['./truck-update.component.css']
})
export class TruckUpdateComponent implements OnInit {

  id:String;
  truck: any = {};

  constructor(private truckService: TruckService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.truckService.getTruckById(this.id).subscribe(res=>{
        this.truck = res;
        let temp = document.getElementById('driverName') as HTMLInputElement
        temp.value =this.truck.driverName
        let temp2 = document.getElementById('phone') as HTMLInputElement
        temp2.value =this.truck.phone
        let temp3 = document.getElementById('licPlate') as HTMLInputElement
        temp3.value =this.truck.licPlate
        let temp4 = document.getElementById('carrCapacity') as HTMLInputElement
        temp4.value =this.truck.carrCapacity
      })
    })
  }

  updateTruck(driverName,phone,licPlate,carrCapacity){
    this.truckService.updateTruck(this.id,driverName,phone,licPlate,carrCapacity).subscribe(()=>{
      this.router.navigate(['/trucks']);
    })
  }
}