import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { CookieService } from 'ngx-cookie-service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './Components/add/add.component';
import { GetComponent } from './Components/get/get.component';
import { UpdateComponent } from './Components/update/update.component';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './user.service';
import { ProductService } from './Services/product.service';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import {AuthGuard} from './Guards/auth.guard';
import {AdminGuard} from './Guards/admin.guard';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ProductGetComponent } from './Components/product-get/product-get.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { ProductUpdateComponent } from './Components/product-update/product-update.component';
import { ProviderGetComponent } from './Components/provider-get/provider-get.component';
import { ProviderAddComponent } from './Components/provider-add/provider-add.component';
import { ProviderUpdateComponent } from './Components/provider-update/provider-update.component';
import { DinningRoomGetComponent } from './Components/dinning-room-get/dinning-room-get.component';
import { DinningRoomAddComponent } from './Components/dinning-room-add/dinning-room-add.component';
import { DinningRoomUpdateComponent } from './Components/dinning-room-update/dinning-room-update.component';
import { UnitGetComponent } from './Components/unit-get/unit-get.component';
import { UnitAddComponent } from './Components/unit-add/unit-add.component';
import { UnitUpdateComponent } from './Components/unit-update/unit-update.component';
import { OrderGetComponent } from './Components/order-get/order-get.component';
import { OrderAddComponent } from './Components/order-add/order-add.component';
import { OrderUpdateComponent } from './Components/order-update/order-update.component';
import { CategoriesAddComponent } from './Components/categories-add/categories-add.component';
import { CategoriesGetComponent } from './Components/categories-get/categories-get.component';
import { CategoriesUpdateComponent } from './Components/categories-update/categories-update.component';
import { RolGetComponent } from './Components/rol-get/rol-get.component';
import { RolAddComponent } from './Components/rol-add/rol-add.component';
import { PendingOrderGetComponent } from './Components/pending-order-get/pending-order-get.component';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    GetComponent,
    UpdateComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    ProductGetComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    ProviderGetComponent,
    ProviderAddComponent,
    ProviderUpdateComponent,
    DinningRoomGetComponent,
    DinningRoomAddComponent,
    DinningRoomUpdateComponent,
    UnitGetComponent,
    UnitAddComponent,
    UnitUpdateComponent,
    OrderGetComponent,
    OrderAddComponent,
    OrderUpdateComponent,
    CategoriesAddComponent,
    CategoriesGetComponent,
    CategoriesUpdateComponent,
    RolGetComponent,
    RolAddComponent,
    PendingOrderGetComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    FlashMessagesModule.forRoot()
    
  ],
  providers: [UserService, AuthGuard,ProductService,CookieService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
