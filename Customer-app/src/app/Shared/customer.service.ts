import { Injectable } from '@angular/core';
import { Customer } from "../Models/customer";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUri:string = "http://localhost:58030/api";

  constructor(private http : HttpClient) { }

  //provide detail for login and sign up both
  addUser(customer:Customer) {
    return this.http.post(this.baseUri+'/Customer/login', customer);
  }

  //to check the otp
  otpCheck(customer:Customer){
    return this.http.post(this.baseUri+'/Customer/customerOtp', customer);
  }

  //for get the all details of user
  getUserDetails(custId:string) {
    return this.http.get(this.baseUri+'/Customer/GetOne/'+custId);
  }

  //to edit the user information
  updateUserDetails(custId:string,formsData) {
    return this.http.put(this.baseUri+"/Customer/Update/"+custId,formsData);
  }

}
