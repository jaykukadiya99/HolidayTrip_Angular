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

  getTotCount() {
    return this.http.get(this.baseUri+"/AllRoute/adminCount");
  }

  getAllAgents() {
    return this.http.get(this.baseUri+"/Agent");
  }

  getAllPackage(agentId : any) {
    return this.http.get(this.baseUri+"/AllRoute/AgentPackage/"+agentId);
  }

  //AllRoute/agentPackageStatus
  togglePackgeStatus(pckgId : any, status : any) {
    return this.http.get(this.baseUri+"/AllRoute/adminPackageStatus/"+pckgId+"/"+status);
  }

  changeCity(cityId:any, formsData:any) {
    return this.http.put(this.baseUri+"/City/"+cityId,formsData);
  }

  changeCategory(categoryId:any, formsData:any) {
    return this.http.put(this.baseUri+"/Category/"+categoryId,formsData);
  }
}
