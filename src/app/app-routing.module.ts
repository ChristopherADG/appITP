import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './Components/add/add.component';
import { GetComponent } from './Components/get/get.component';
import { UpdateComponent } from './Components/update/update.component';
import { LoginComponent } from "./Components/login/login.component";
import { ProductAddComponent } from "./Components/product-add/product-add.component";
import { ProductGetComponent} from './Components/product-get/product-get.component';
import {ProductUpdateComponent} from './Components/product-update/product-update.component';
import { UnitAddComponent } from "./Components/unit-add/unit-add.component";
import { UnitGetComponent} from './Components/unit-get/unit-get.component';
import {UnitUpdateComponent} from './Components/unit-update/unit-update.component';
import { ProviderAddComponent } from "./Components/provider-add/provider-add.component";
import { ProviderGetComponent} from './Components/provider-get/provider-get.component';
import {ProviderUpdateComponent} from './Components/provider-update/provider-update.component';
import { DinningRoomAddComponent } from "./Components/dinning-room-add/dinning-room-add.component";
import { DinningRoomGetComponent} from './Components/dinning-room-get/dinning-room-get.component';
import {DinningRoomUpdateComponent} from './Components/dinning-room-update/dinning-room-update.component';
import { OrderAddComponent } from "./Components/order-add/order-add.component";
import { OrderGetComponent} from './Components/order-get/order-get.component';
import { CategoriesGetComponent } from './Components/categories-get/categories-get.component';
import { CategoriesAddComponent } from "./Components/categories-add/categories-add.component";
//import {CategoriesUpdateComponent} from './Components/categories-update.component';
//import {OrderUpdateComponent} from './Components/order-update/order-update.component';
import {AuthGuard} from './Guards/auth.guard';

const routes: Routes = [
  {path: 'users', component: GetComponent, canActivate:[AuthGuard]},
  {path: 'edit/:id', component: UpdateComponent, canActivate:[AuthGuard]},
  {path: 'create', component: AddComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'createProduct', component: ProductAddComponent, canActivate:[AuthGuard]},
  {path: 'products', component: ProductGetComponent, canActivate:[AuthGuard]},
  {path: 'editProduct/:id', component: ProductUpdateComponent, canActivate:[AuthGuard]},
  {path: 'createProvider', component: ProviderAddComponent, canActivate:[AuthGuard]},
  {path: 'providers', component: ProviderGetComponent, canActivate:[AuthGuard]},
  {path: 'editProvider/:id', component: ProviderUpdateComponent, canActivate:[AuthGuard]},
  {path: 'createDinningRoom', component: DinningRoomAddComponent, canActivate:[AuthGuard]},
  {path: 'dinningRooms', component: DinningRoomGetComponent, canActivate:[AuthGuard]},
  {path: 'editDinningRoom/:id', component: DinningRoomUpdateComponent, canActivate:[AuthGuard]},
  {path: 'createUnit', component: UnitAddComponent, canActivate:[AuthGuard]},
  {path: 'units', component: UnitGetComponent, canActivate:[AuthGuard]},
  {path: 'editUnits/:id', component: UnitUpdateComponent, canActivate:[AuthGuard]},
  {path: 'createOrder', component: OrderAddComponent, canActivate:[AuthGuard]},
  {path: 'orders', component: OrderGetComponent, canActivate:[AuthGuard]},
  {path: 'categories', component:CategoriesGetComponent, canActivate:[AuthGuard]},
  {path: 'createCategories', component: CategoriesAddComponent, canActivate:[AuthGuard]},
  //{path: 'editCategories/:id', component: CategoriesUpdateComponent, canActivate:[AuthGuard]},
  {path: '', component: LoginComponent},
  {path: '**', component: LoginComponent}


];

//{path: 'editOrder/:id', component: OrderUpdateComponent, canActivate:[AuthGuard]}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
