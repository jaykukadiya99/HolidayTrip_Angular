import { Injectable } from '@angular/core';
import { Package } from "../../Models/package";
import { HttpClient } from "@angular/common/http";
import { analyzeFile } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  
  private packages:Package;
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  //get all package of this agent
  getAllPackage(){    
    var tokenid = localStorage.getItem("AgentId");
    console.log(tokenid);
    return this.http.get(this.baseUri+"/AllRoute/AgentPackage/"+tokenid);
  }

  insertPackage(formdata){
    var tokenid = localStorage.getItem("AgentId");
    return this.http.post(this.baseUri+"/Package/"+tokenid,formdata);
  }

  setter(packages:Package) {
    this.packages=packages;
  }

  getter() {
    return this.packages;
  }
}
