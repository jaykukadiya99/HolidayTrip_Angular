import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Agent } from "../../Models/agent";

@Injectable({
  providedIn: 'root'
})


export class AgentLoginService {
  private baseUri:string = "http://localhost:58030/api";
  
  constructor(private http:HttpClient) { }

  agentLogin(agents:Agent) {
    return this.http.post(this.baseUri+"/AllRoute/AgentLogin",agents);
  }

  agentSingUp(agent:Agent){
    return this.http.post(this.baseUri+"/Agent",agent);
  }
}
