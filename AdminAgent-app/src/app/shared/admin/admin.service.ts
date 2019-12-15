import { Injectable } from '@angular/core';
import { Admin } from "../../Models/admin";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  //for give the login credentials
  agentLogin(admins:Admin) {
    return this.http.post(this.baseUri+"/AllRoute/AdminLogin",admins);
  }

  //for get the total count of users and agents
  getTotCount() {
    return this.http.get(this.baseUri+"/AllRoute/adminCount");
  }

  //for get all details of all agents
  getAllAgents() {
    return this.http.get(this.baseUri+"/Agent");
  }

  //for get all packages of one agent
  getAllPackage(agentId : any) {
    return this.http.get(this.baseUri+"/AllRoute/AgentPackage/"+agentId);
  }

  //for enable and disable package
  togglePackgeStatus(pckgId : any, status : any) {
    return this.http.get(this.baseUri+"/AllRoute/adminPackageStatus/"+pckgId+"/"+status);
  }

  //for edit the city
  changeCity(cityId:any, formsData:any) {
    return this.http.put(this.baseUri+"/City/"+cityId,formsData);
  }

  //for edit the category
  changeCategory(categoryId:any, formsData:any) {
    return this.http.put(this.baseUri+"/Category/"+categoryId,formsData);
  }
}
