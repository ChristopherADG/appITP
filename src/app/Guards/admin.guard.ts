import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../Services/auth.service';


@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private authService: AuthService, private router:Router){

    }
    canActivate(){
        if(this.authService.getRole() == "Admin"){
            return true;
        } else{
            this.router.navigate(['orders']);
            return false;
        }
    }
}