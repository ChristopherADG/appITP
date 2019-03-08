import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './Components/add/add.component';
import { GetComponent } from './Components/get/get.component';
import { UpdateComponent } from './Components/update/update.component';
import { LoginComponent } from "./Components/login/login.component"
import {AuthGuard} from './Guards/auth.guard';

import { GetProvidersComponent } from './Components/get-providers/get-providers.component';
import { AddProvidersComponent } from './Components/add-providers/add-providers.component';
import {UpdateProvidersComponent} from './Components/update-providers/update-providers.component';

const routes: Routes = [
  {path: 'users', component: GetComponent, canActivate:[AuthGuard]}, 
  {path: 'edit/:id', component: UpdateComponent, canActivate:[AuthGuard]},
  {path: 'create', component: AddComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'providers', component: GetProvidersComponent},
  {path: 'editProvider/:id', component: UpdateProvidersComponent, canActivate:[AuthGuard]},
  {path: 'create-providers', component: AddProvidersComponent, canActivate:[AuthGuard]},
  //{path:  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
