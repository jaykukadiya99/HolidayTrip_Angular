import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  //for fetch details of all inquiry
  getAllInquiry() {
    var id = localStorage.getItem("AgentId");
    return this.http.get(this.baseUri+"/AllRoute/agentInquiry/"+id);
  }

  //for get the details of specific customer
  getSpecificCustomer(custId:string) {
    return this.http.get(this.baseUri+"/Customer/GetOne/"+custId);
  }

  //for mark the inquiry as completed
  setInquiryCompleted(inqId:string) {
    return this.http.get(this.baseUri+"/AllRoute/inquiryComplete/"+inqId);
  }
}
