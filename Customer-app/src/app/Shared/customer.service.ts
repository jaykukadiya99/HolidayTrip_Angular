import { Injectable } from '@angular/core';
import { Customer } from "../Models/customer";
import { HttpClient,HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUri:string = "http://localhost:58030/api";
  private customer : Customer;
  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'jay'
  });

  constructor(private http : HttpClient) { }

  addUser(customer:Customer) {
    return this.http.post(`${this.baseUri}`+'/Customer/login', customer,{ headers: this.headers });
  }

  otpCheck(customer:Customer){
    return this.http.post(`${this.baseUri}`+'/Customer/customerOtp', customer);
  }
}
