import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  generateInquiry(objInq : any) {
    return this.http.post(this.baseUri+"/Inquiry",objInq);
  }
}
