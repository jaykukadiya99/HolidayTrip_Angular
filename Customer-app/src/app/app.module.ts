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
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuardService } from "./Shared/Authenticate/auth-guard.service";

const custRoute :Routes = [ 
   {path:"",component:DashboardComponent,canActivate: [AuthGuardService]},
   {path:"customerLogin",component:CustomerLoginComponent}
];

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

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
    RouterModule.forRoot(custRoute),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:58030"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [CustomerService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
