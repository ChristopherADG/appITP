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
import {OrderUpdateComponent} from './Components/order-update/order-update.component';
import { RolGetComponent } from "./Components/rol-get/rol-get.component";
import { RolAddComponent } from './Components/rol-add/rol-add.component';
//import {PendingOrderGetComponent} from "./Components/pending-order-get/pending-order-get.component";
import {OrderDetailComponent} from "./Components/order-detail/order-detail.component";
import {TruckAddComponent} from "./Components/truck-add/truck-add.component"
import {TruckGetComponent} from "./Components/truck-get/truck-get.component"
import {TruckUpdateComponent} from "./Components/truck-update/truck-update.component"
import {AuthGuard} from './Guards/auth.guard';
import {AdminGuard} from './Guards/admin.guard';

const routes: Routes = [
  {path: 'users', component: GetComponent, canActivate:[AuthGuard, AdminGuard]}, 
  {path: 'edit/:id', component: UpdateComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'create', component: AddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'createProduct', component: ProductAddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'products', component: ProductGetComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'editProduct/:id', component: ProductUpdateComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'createProvider', component: ProviderAddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'providers', component: ProviderGetComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'editProvider/:id', component: ProviderUpdateComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'createDinningRoom', component: DinningRoomAddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'dinningRooms', component: DinningRoomGetComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'editDinningRoom/:id', component: DinningRoomUpdateComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'createUnit', component: UnitAddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'units', component: UnitGetComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'editUnits/:id', component: UnitUpdateComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'createOrder', component: OrderAddComponent, canActivate:[AuthGuard]},
  {path: 'orders', component: OrderGetComponent, canActivate:[AuthGuard]},
  {path: 'categories', component:CategoriesGetComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'createCategories', component: CategoriesAddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: "createRol", component: RolAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: "roles", component: RolGetComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: "detailOrder/:id/:statusId", component: OrderDetailComponent, canActivate:[AuthGuard]},
  {path: "trucks", component: TruckGetComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: "createTruck", component: TruckAddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: "editTruck/:id", component: TruckUpdateComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: "editOrder/:id", component: OrderUpdateComponent, canActivate:[AuthGuard]},
  
  {path: '', component: LoginComponent},
  {path: '**', component: LoginComponent}
  
];

//{path: "pendingOrders", component: PendingOrderGetComponent, canActivate:[AuthGuard]},

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
