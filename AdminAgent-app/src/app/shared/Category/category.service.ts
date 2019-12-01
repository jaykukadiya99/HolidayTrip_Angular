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

  addNewCategory(data){
    return this.http.post(this.baseUri+"/Category/",data);
  }

  deleteCategory(id){
    return this.http.delete(this.baseUri+"/Category/"+id);
  }
}
