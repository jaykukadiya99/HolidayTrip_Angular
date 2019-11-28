import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../../Shared/customer.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from "../../Models/customer";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-customer-otp',
  templateUrl: './customer-otp.component.html',
  styleUrls: ['./customer-otp.component.css']
})
export class CustomerOtpComponent implements OnInit {
  private customers :Customer = new Customer();

  constructor(private jwtHelper: JwtHelperService,
    private _customerService :CustomerService,
    private routes :Router) { }

  ngOnInit() {
    var token = localStorage.getItem("jwt");
    var jwtdata = this.jwtHelper.decodeToken(token);
    var data = JSON.parse(jwtdata.sub);

    this.customers.OTP=data.OTP;
    this.customers.Mobile=data.Mobile;
  }

  otpCheck(){
    this._customerService.otpCheck(this.customers).subscribe(
      data => {
        let msgObj : any;
        msgObj=data;
        console.log(data);
        if(msgObj.msg=="Valid User")
        {
          // this.routes.navigate(["/"]);
        }
        else
        {
          // this.routes.navigate(["/customerLogin"]);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
