import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AgentLoginService } from '../../../shared/Agent/agent-login.service';
import { Router } from '@angular/router';
import { Agent } from '../../../Models/agent';
@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService,
    private _agentLoginService :AgentLoginService,
    private routes :Router) { }

    private agents : Agent = new Agent();
    private invalidLogin ;
  ngOnInit() {
  }

  login(){
    this._agentLoginService.agentLogin(this.agents).subscribe(      
      data => {
        // console.log(data);
        let token = (<any>data).token;
        localStorage.setItem("AgentToken", token);
        //console.log(this.jwtHelper.decodeToken(token));
        var jwtdata = this.jwtHelper.decodeToken(token);
        // var data = JSON.parse(jwtdata.sub);
        localStorage.setItem("AgentId", jwtdata.nameid);
        this.invalidLogin = false;
        window.alert("Login Successfully");
        this.routes.navigate(["/"]);
      }, err => {
        this.invalidLogin = true;
      }
    )
  }
}
