import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../../Shared/customer.service";
import { Router } from '@angular/router';
import { Customer } from "../../Models/customer";
import { JwtHelperService } from "@auth0/angular-jwt";
import swal from "sweetalert2";

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  private customers :Customer = new Customer();
  private invalidLogin ;

  constructor(private jwtHelper: JwtHelperService,
    private _customerService :CustomerService,
    private routes :Router) { }

  ngOnInit() {
    
  }
  
  login(){
    this._customerService.addUser(this.customers).subscribe(      
      response => {
        // console.log(response);
        let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        //console.log(this.jwtHelper.decodeToken(token));
        var jwtdata = this.jwtHelper.decodeToken(token);
        // var data = JSON.parse(jwtdata.sub);
        localStorage.setItem("customerId", jwtdata.nameid);
        localStorage.setItem("userType",jwtdata.typ);
        this.invalidLogin = false;
        this.routes.navigate(["/customer-otp"]);
      }, err => {
        this.invalidLogin = true;
      }
    )
  }

  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("customerId");
    // window.alert("Logged Out Successfully");
    swal.fire('Logged Out Successfully');
 }
}
