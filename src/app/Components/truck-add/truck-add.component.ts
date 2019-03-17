import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {TruckService} from '../../Services/truck.service';

@Component({
  selector: 'app-truck-add',
  templateUrl: './truck-add.component.html',
  styleUrls: ['./truck-add.component.css']
})
export class TruckAddComponent implements OnInit {

  constructor(private truckService: TruckService, private router: Router) { }

  ngOnInit() {
  }

  addTruck(driverName,phone,licPlate,carrCapacity){
    console.log(driverName,phone,licPlate,carrCapacity)
    this.truckService.addTruck(driverName,phone,licPlate,carrCapacity)
      .subscribe(()=>{
        this.router.navigate(['/trucks']);
      })
  }

}