import { Component, OnInit } from '@angular/core';
import { Agent } from "../../../Models/agent";
import { AgentLoginService } from "../../../shared/Agent/agent-login.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Component({
  selector: 'app-agent-signup',
  templateUrl: './agent-signup.component.html',
  styleUrls: ['./agent-signup.component.css']
})
export class AgentSignupComponent implements OnInit {
  private agents : Agent = new Agent();
  private invalidLogin;
  constructor(private jwtHelper : JwtHelperService
    ,private routes : Router
    ,private _agentService:AgentLoginService) { }

  ngOnInit() {
  }

  signup(){
    this._agentService.agentSingUp(this.agents).subscribe(
      data => {
        // console.log("signup" + data);
        let token = (<any>data).token;
        localStorage.setItem("AgentToken", token);
        //console.log(this.jwtHelper.decodeToken(token));
        var jwtdata = this.jwtHelper.decodeToken(token);
        // var data = JSON.parse(jwtdata.sub);
        localStorage.setItem("AgentId", jwtdata.nameid);
        this.invalidLogin = false;
        this.routes.navigate(["/"]);
      },
      error =>
      {
        this.invalidLogin = true;
      }
    )
  }
}
