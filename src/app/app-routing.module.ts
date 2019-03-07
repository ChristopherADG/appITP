import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './Components/add/add.component';
import { GetComponent } from './Components/get/get.component';
import { UpdateComponent } from './Components/update/update.component';
import { LoginComponent } from "./Components/login/login.component"

const routes: Routes = [
  {path: 'users', component: GetComponent}, 
  {path: 'edit/:id', component: UpdateComponent},
  {path: 'create', component: AddComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
