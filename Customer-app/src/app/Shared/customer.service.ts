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

  addBook(name) {
    const obj = {
      name: name
    };
    console.log(obj);
    return this.http.post(`${this.baseUri}`+'/Customer/login', obj);
  }
}
