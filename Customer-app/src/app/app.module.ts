import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule ,HttpInterceptor } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from "@auth0/angular-jwt";
import { JwPaginationComponent } from "jw-angular-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerOtpComponent } from './components/customer-otp/customer-otp.component';

import { CustomerService } from "./Shared/customer.service";
import { AuthGuardService } from "./Shared/Authenticate/auth-guard.service";
import { PackageService } from "./Shared/package.service";
import { MyinquiryComponent } from './components/myinquiry/myinquiry.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const custRoute :Routes = [ 
   {path:"",component:DashboardComponent},
   {path:"customerLogin",component:CustomerLoginComponent},
   {path:"customer-otp",component:CustomerOtpComponent,canActivate:[AuthGuardService]},
   {path:"myInquiry",component:MyinquiryComponent,canActivate:[AuthGuardService]},
   {path:"myProfile",component:MyprofileComponent,canActivate:[AuthGuardService]}
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
    CustomerOtpComponent,
    JwPaginationComponent,
    MyinquiryComponent,
    MyprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(custRoute),
    HttpClientModule,
    Ng2SearchPipeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:58030"],
        blacklistedRoutes: []
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CustomerService,AuthGuardService,PackageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
