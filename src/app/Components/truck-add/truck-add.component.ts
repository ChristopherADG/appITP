import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {TruckService} from '../../Services/truck.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'

@Component({
  selector: 'app-truck-add',
  templateUrl: './truck-add.component.html',
  styleUrls: ['./truck-add.component.css']
})
export class TruckAddComponent implements OnInit {

  constructor(private truckService: TruckService, private router: Router) { }
  validatingForm: FormGroup;
  ngOnInit() {
    this.validatingForm = new FormGroup({
    driverName: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^[2-9]{2}\d{8}$/)]),
    licPlate: new FormControl(null, [Validators.required, Validators.pattern(/^([A-Z]{3}-\d{2}-\d{2})$/)]),
    carrCapacity: new FormControl(null, [Validators.required, Validators.pattern(/^(\d+ [a-zA-Z]{2})$/)]),
    });
  }
  get valid_driverName() { return this.validatingForm.get('driverName'); }
  get valid_phone() { return this.validatingForm.get('phone'); }
  get valid_licPlate() { return this.validatingForm.get('licPlate'); }
  get valid_carrCapacity() { return this.validatingForm.get('carrCapacity'); }


  addTruck(driverName,phone,licPlate,carrCapacity){
    console.log(driverName,phone,licPlate,carrCapacity)
    this.truckService.addTruck(driverName,phone,licPlate,carrCapacity)
      .subscribe(()=>{
        this.router.navigate(['/trucks']);
      })
  }

}