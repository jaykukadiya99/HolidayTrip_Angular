import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AgentLoginService } from '../../../shared/Agent/agent-login.service';
import { Router } from '@angular/router';
import { Agent } from '../../../Models/agent';
import swal from "sweetalert2";

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
        if(data===null){
          // window.alert("Unknown User..! Try agin later.");
          swal.fire("Unknown User..! Try agin later.");
        } else {
          let token = (<any>data).token;
          localStorage.setItem("AgentToken", token);
          var jwtdata = this.jwtHelper.decodeToken(token);
          localStorage.setItem("AgentId", jwtdata.nameid);
          this.invalidLogin = false;
          swal.fire("Login Successfully");
          this.routes.navigate(["/"]);
        }
      }, err => {
        this.invalidLogin = true;
      }
    )
  }
}
