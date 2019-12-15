import { Component, OnInit } from '@angular/core';
import { Agent } from "../../../Models/agent";
import { AgentLoginService } from "../../../shared/Agent/agent-login.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-agent-signup',
  templateUrl: './agent-signup.component.html',
  styleUrls: ['./agent-signup.component.css']
})

export class AgentSignupComponent implements OnInit {
  private agents : Agent = new Agent();
  private invalidLogin;
  constructor(private jwtHelper : JwtHelperService, 
    private routes : Router,
    private _agentService:AgentLoginService) { }

  ngOnInit() {
  }

  signup(){
    this._agentService.agentSingUp(this.agents).subscribe(
      data => {
        // console.log("signup" + data);
        if(data===null){
          // window.alert("Something Wrong. Please try again later.");
          swal.fire("Something Wrong. Please try again later.");
        } else {
          let token = (<any>data).token;
          localStorage.setItem("AgentToken", token);
          var jwtdata = this.jwtHelper.decodeToken(token);
          localStorage.setItem("AgentId", jwtdata.nameid);
          this.invalidLogin = false;
          // window.alert("Signed up Successfully");
          swal.fire("Signed up Successfully");
          this.routes.navigate(["/"]);
        }
      },
      error =>
      {
        this.invalidLogin = true;
      }
    )
  }
}
