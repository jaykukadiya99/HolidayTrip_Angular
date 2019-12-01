import { Injectable } from '@angular/core';
import { Admin } from "../../Models/admin";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  agentLogin(admins:Admin) {
    return this.http.post(this.baseUri+"/AllRoute/AdminLogin",admins);
  }
}