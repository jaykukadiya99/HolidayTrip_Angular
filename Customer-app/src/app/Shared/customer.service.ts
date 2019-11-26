import { Injectable } from '@angular/core';
import { Customer } from "../Models/customer";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUri:string = "http://localhost:58030/api";
  private customer : Customer;
  
  constructor(private http : HttpClient) { }

  customerLogin(customer:Customer){
    return this.http.post(this.baseUri+"/AllRoute/AgentLogin",this.customer);
  }
}
