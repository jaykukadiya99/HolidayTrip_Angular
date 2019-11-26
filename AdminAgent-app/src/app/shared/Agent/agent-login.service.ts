import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Agent } from "../../Models/agent";

@Injectable({
  providedIn: 'root'
})


export class AgentLoginService {
  private agents:Agent;
  private objAgent : AgentLogin;
  private baseUri:string = "http://localhost:58030/api";
  constructor(private http:HttpClient) { }

  agentLogin(agents:Agent) {
    this.objAgent.AgencyEmail = this.agents.AgencyEmail;
    this.objAgent.Pass = this.agents.Pass;
    return this.http.post(this.baseUri+"/AllRoute/AgentLogin",this.objAgent);
  }
}

class AgentLogin {
  public AgencyEmail : string;
  public Pass : string;
}
