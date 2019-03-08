import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
//import {MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule} from '@angular/material'

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
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ProductGetComponent } from './Components/product-get/product-get.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { ProductUpdateComponent } from './Components/product-update/product-update.component';

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
    ProductUpdateComponent
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
  providers: [UserService, AuthGuard,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
