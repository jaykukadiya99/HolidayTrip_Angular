import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  getAllCategory() {
    return this.http.get(this.baseUri+"/Category");
  }
}
