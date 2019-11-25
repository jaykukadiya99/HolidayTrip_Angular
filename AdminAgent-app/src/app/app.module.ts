import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/Agent/navbar/navbar.component';
import { PackageComponent } from './components/Agent/package/package.component';
import { DashboardComponent } from './components/Agent/dashboard/dashboard.component';
import { PackageService } from "../app/shared/Agent/package.service";
import { CreatePackageComponent } from './components/Agent/create-package/create-package.component';

const agentRoutes:Routes = [
  {path:'agent/package',component:PackageComponent},
  {path:'agent/dashboard', component:DashboardComponent},
  {path:'agent/package/create',component:CreatePackageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PackageComponent,
    DashboardComponent,
    CreatePackageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(agentRoutes)
  ],
  providers: [PackageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
