import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountTotalService {
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  getTotalCount(){
    var id = localStorage.getItem("AgentId");
    return this.http.get(this.baseUri+"/AllRoute/agentCount/"+id);
  }
}
