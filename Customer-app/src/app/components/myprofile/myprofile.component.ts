import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerService } from "../../Shared/customer.service";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  public customer:any={
    FirstName:"", LastName:"", Mobile:"", Email: "", OTP:""
  };
  constructor(private router:Router, private _customerService:CustomerService) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer(){
    let custId: string = localStorage.getItem("customerId");
    this._customerService.getUserDetails(custId).subscribe(
      data=>{
        this.customer=data;
        // console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  updateCustomer() {
    let custId: string = localStorage.getItem("customerId");
    let formsData = new FormData();
    formsData.append("data",JSON.stringify(this.customer));
    this._customerService.updateUserDetails(custId,formsData).subscribe(
      data => {
        window.alert("Your profile is updated");
        this.getCustomer();
        //console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }
}
