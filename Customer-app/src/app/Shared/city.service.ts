import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  //to fetch all city
  getAllCity() {
    return this.http.get(this.baseUri+"/City");
  }
}
