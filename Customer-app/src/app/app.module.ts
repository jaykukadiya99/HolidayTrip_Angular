import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CustomerService } from "./Shared/customer.service";


const custRoute :Routes = [ 
   {path:"",component:DashboardComponent},
   {path:"customerLogin",component:CustomerLoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerLoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(custRoute)
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
