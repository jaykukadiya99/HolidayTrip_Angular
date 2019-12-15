import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  //for fetch all category
  getAllCategory() {
    return this.http.get(this.baseUri+"/Category");
  }

  //for add new category
  addNewCategory(data){
    return this.http.post(this.baseUri+"/Category/",data);
  }

  //for delete one category
  deleteCategory(id){
    return this.http.delete(this.baseUri+"/Category/"+id);
  }
}
