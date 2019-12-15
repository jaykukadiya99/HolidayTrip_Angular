import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  //for fetch all cities
  getAllCity() {
    return this.http.get(this.baseUri+"/City");
  }

  //for insert new city
  addNewCity(city){
    return this.http.post(this.baseUri+"/City",city);
  }

  //for delete city
  deleteCity(id){
    return this.http.delete(this.baseUri+"/City/"+id);
  }
}
