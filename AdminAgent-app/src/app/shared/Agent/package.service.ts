import { Injectable } from '@angular/core';
import { Package } from "../../Models/package";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  getAllPackage(){
    return this.http.get(this.baseUri+"/Package");
  }
}
