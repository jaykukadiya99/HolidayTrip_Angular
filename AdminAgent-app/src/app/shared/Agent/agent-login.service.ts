import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Agent } from "../../Models/agent";

@Injectable({
  providedIn: 'root'
})


export class AgentLoginService {
  private baseUri:string = "http://localhost:58030/api";
  
  constructor(private http:HttpClient) { }

  //for provide credential to agent login
  agentLogin(agents:Agent) {
    return this.http.post(this.baseUri+"/AllRoute/AgentLogin",agents);
  }

  //for new agent registration
  agentSingUp(agent:Agent){
    return this.http.post(this.baseUri+"/Agent",agent);
  }

  //get the detail of perticular agent
  getAgent(){
    var id = localStorage.getItem("AgentId");
    return this.http.get(this.baseUri+"/Agent/"+id);
  }

  //for edit the agent details
  updateAgent(value){
    var id = localStorage.getItem("AgentId");
    return this.http.put(this.baseUri+"/Agent/"+id,value);
  }
}
