import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../shared/admin/admin.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { Admin } from 'src/app/Models/admin';
import swal from "sweetalert2";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private jwtHelper: JwtHelperService,private _adminLoginService :AdminService,
    private routes :Router) { }
    private admins : Admin = new Admin();
  ngOnInit() {
  }

  login(){
    this._adminLoginService.agentLogin(this.admins).subscribe(
      data=>{
        // let token = (<any>data).token;
        // localStorage.setItem("AdminToken", token);
        // console.log(this.jwtHelper.decodeToken(token));
        // var jwtdata = this.jwtHelper.decodeToken(token);
        // // var data = JSON.parse(jwtdata.sub);
        // localStorage.setItem("AdminId", jwtdata.nameid);
        let adminObj:any = data;
        // console.log(data);
        if(adminObj.msg=="Invalid User") {
          // window.alert("Invalid User");
          swal.fire("Invalid User");
        } else {
          localStorage.setItem("AdminId",adminObj.id);
          // window.alert("Login Successfully.");
          swal.fire("Login Successfully.");
          this.routes.navigate(["admin/dashboard"]);
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
}
