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


const agentRoutes:Routes = [
  {path:'agent',component:PackageComponent},
  {path:'agent/dashboard', component:DashboardComponent},
  {path:'agent/package/create',component:CreatePackageComponent},
  {path:'agent/login',component:AgentLoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PackageComponent,
    DashboardComponent,
    CreatePackageComponent,
    AgentLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    RouterModule.forRoot(agentRoutes)
  ],
  providers: [PackageService,AgentLoginService,CategoryService,CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
