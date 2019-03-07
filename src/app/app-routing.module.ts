import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './Components/add/add.component';
import { GetComponent } from './Components/get/get.component';
import { UpdateComponent } from './Components/update/update.component';
import { LoginComponent } from "./Components/login/login.component"
import {AuthGuard} from './Guards/auth.guard';

const routes: Routes = [
  {path: 'users', component: GetComponent, canActivate:[AuthGuard]}, 
  {path: 'edit/:id', component: UpdateComponent, canActivate:[AuthGuard]},
  {path: 'create', component: AddComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
