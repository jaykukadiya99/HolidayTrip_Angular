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

  //for load all the packages
  getAllPackage(){    
    var tokenid = localStorage.getItem("AgentId");
    // console.log(tokenid);
    return this.http.get(this.baseUri+"/AllRoute/AgentPackage/"+tokenid);
  }

  //for creating new package
  insertPackage(formdata){
    var tokenid = localStorage.getItem("AgentId");
    return this.http.post(this.baseUri+"/Package/"+tokenid,formdata);
  }

  //for set the object o/w null reference error
  setter(packages:Package) {
    this.packages=packages;
  }

  //for get the value of object
  getter() {
    return this.packages;
  }

  //for removing the package
  deletePackage(id)
  {
    return this.http.delete(this.baseUri+"/Package/"+id);
  }
}
