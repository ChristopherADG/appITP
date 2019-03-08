import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import {AuthGuard} from './Guards/auth.guard';

import {ProviderService} from './provider.service';
import { GetProvidersComponent } from './Components/get-providers/get-providers.component';
import { AddProvidersComponent } from './Components/add-providers/add-providers.component';
import { UpdateProvidersComponent } from './Components/update-providers/update-providers.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    GetComponent,
    UpdateComponent,
    LoginComponent,
    NavbarComponent,
    GetProvidersComponent,
    AddProvidersComponent,
    UpdateProvidersComponent
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
  providers: [UserService, AuthGuard, ProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
