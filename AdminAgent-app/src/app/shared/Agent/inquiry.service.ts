import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  getAllInquiry() {
    var id = localStorage.getItem("AgentId");
    return this.http.get(this.baseUri+"/AllRoute/agentInquiry/"+id);
  }

  getSpecificCustomer(custId:string) {
    return this.http.get(this.baseUri+"/Customer/GetOne/"+custId);
  }

  setInquiryCompleted(inqId:string) {
    return this.http.get(this.baseUri+"/AllRoute/inquiryComplete/"+inqId);
  }
}
