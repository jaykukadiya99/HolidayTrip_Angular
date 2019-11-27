import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../../Shared/customer.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from "../../Models/customer";
import { error } from 'util';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  private customers :Customer = new Customer();
  private invalidLogin ;

  constructor(private _customerService :CustomerService,private routes :Router) { 
  }

  ngOnInit() {

  }
  
  login(){
    this._customerService.addUser(this.customers).subscribe(
      // data =>{
      //   console.log(data);
      // },
      // error => {
      //   console.log(error);
      // }
      response => {
        console.log(response);
        let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.routes.navigate(["/"]);
      }, err => {
        this.invalidLogin = true;
      }
    )
  }

  logOut() {
    localStorage.removeItem("jwt");
 }
}
