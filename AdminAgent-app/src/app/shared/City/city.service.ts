import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  getAllCity() {
    return this.http.get(this.baseUri+"/City");
  }

  addNewCity(city){
    return this.http.post(this.baseUri+"/City",city);
  }

  deleteCity(id){
    return this.http.delete(this.baseUri+"/City/"+id);
  }
}
