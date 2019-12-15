import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  //for creating new inquiry
  generateInquiry(objInq : any) {
    return this.http.post(this.baseUri+"/Inquiry",objInq);
  }

  //for fetch all the inquiry
  getAllInquiry(custId:any){
    return this.http.get(this.baseUri+"/Customer/customerInquiry/"+custId);
  }

  //for get the detail of perticular agent
  getInquiryAgent(agentId:any){
    return this.http.get(this.baseUri+"/Agent/"+agentId);
  }
}
