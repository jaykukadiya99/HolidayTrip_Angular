import { Injectable } from '@angular/core';
import { Customer } from "../Models/customer";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUri:string = "http://localhost:58030/api";

  constructor(private http : HttpClient) { }

  addUser(customer:Customer) {
    return this.http.post(`${this.baseUri}`+'/Customer/login', customer);
  }

  otpCheck(customer:Customer){
    return this.http.post(`${this.baseUri}`+'/Customer/customerOtp', customer);
  }

  getUserDetails(custId:string) {
    return this.http.get(this.baseUri+'/Customer/GetOne/'+custId);
  }

  updateUserDetails(custId:string,formsData) {
    return this.http.put(this.baseUri+"/Customer/Update/"+custId,formsData);
  }

}
