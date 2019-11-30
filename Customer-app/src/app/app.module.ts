import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule ,HttpInterceptor } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from "@auth0/angular-jwt";
import { JwPaginationComponent } from "jw-angular-pagination";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CustomerOtpComponent } from './components/customer-otp/customer-otp.component';

import { CustomerService } from "./Shared/customer.service";
import { AuthGuardService } from "./Shared/Authenticate/auth-guard.service";
import { PackageService } from "./Shared/package.service";

const custRoute :Routes = [ 
   {path:"",component:DashboardComponent},
   {path:"customerLogin",component:CustomerLoginComponent},
   {path:"customer-otp",component:CustomerOtpComponent,canActivate:[AuthGuardService]},
   {path:"wishList",component:WishListComponent,canActivate: [AuthGuardService]}
];

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerLoginComponent,
    DashboardComponent,
    WishListComponent,
    CustomerOtpComponent,
    JwPaginationComponent
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
  providers: [CustomerService,AuthGuardService,PackageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
