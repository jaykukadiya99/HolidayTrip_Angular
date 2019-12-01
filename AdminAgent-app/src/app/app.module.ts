import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/Agent/navbar/navbar.component';
import { PackageComponent } from './components/Agent/package/package.component';
import { DashboardComponent } from './components/Agent/dashboard/dashboard.component';
import { CreatePackageComponent } from './components/Agent/create-package/create-package.component';
import { AgentLoginComponent } from './components/Agent/agent-login/agent-login.component';

import { DataTablesModule } from "angular-datatables";

import { PackageService } from "../app/shared/Agent/package.service";
import { AgentLoginService } from "../app/shared/Agent/agent-login.service";
import { CategoryService } from "../app/shared/Category/category.service";
import { CityService } from "../app/shared/City/city.service";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuardService } from "./shared/Authenticate/auth-guard.service";
import { AgentSignupComponent } from './components/Agent/agent-signup/agent-signup.component';
import { AdminLoginComponent } from './components/Admin/admin-login/admin-login.component';
import { AdminNavbarComponent } from './components/Admin/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminCityComponent } from './components/Admin/admin-city/admin-city.component';
import { AdminCategoryComponent } from './components/Admin/admin-category/admin-category.component';
import { AgentProfileComponent } from './components/Agent/agent-profile/agent-profile.component';
import { AgentInquiryComponent } from './components/Agent/agent-inquiry/agent-inquiry.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

const agentRoutes:Routes = [
  {path:'package',component:PackageComponent,canActivate:[AuthGuardService]},
  {path:'', component:DashboardComponent,canActivate:[AuthGuardService]},
  {path:'package/create',component:CreatePackageComponent,canActivate:[AuthGuardService]},
  {path:'login',component:AgentLoginComponent},
  {path:'signup',component:AgentSignupComponent},
  {path:'MyProfile',component:AgentProfileComponent},
  {path:'inquiry',component:AgentInquiryComponent},

  {path:'admin',component:AdminLoginComponent},
  {path:'admin/dashboard',component:AdminDashboardComponent},
  {path:'admin/city',component:AdminCityComponent},
  {path:'admin/category',component:AdminCategoryComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PackageComponent,
    DashboardComponent,
    CreatePackageComponent,
    AgentLoginComponent,
    AgentSignupComponent,
    AdminLoginComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    AdminCityComponent,
    AdminCategoryComponent,
    AgentProfileComponent,
    AgentInquiryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    RouterModule.forRoot(agentRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:58030"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [AuthGuardService,PackageService,AgentLoginService,CategoryService,CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
