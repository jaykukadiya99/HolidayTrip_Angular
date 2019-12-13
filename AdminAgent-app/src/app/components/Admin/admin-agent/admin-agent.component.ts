import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../shared/admin/admin.service";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-agent',
  templateUrl: './admin-agent.component.html',
  styleUrls: ['./admin-agent.component.css']
})
export class AdminAgentComponent implements OnInit {

  public agents:any;
  constructor(private router:Router,private _agentService:AdminService) { }
  dtTrigger: Subject<any> = new Subject();
  public baseUri:string="http://localhost:58030/Resources";

  ngOnInit() {
    this.agents = [{
      agencyAddress: {
        addressLine1 : " ",
        addressLine2 : " ",
        area : " ",
        city : " ",
        pincode : " ",
        state : " "
      },
      agencyEmail : " ",
      agencyName : " ",
      agentName : " ",
      contactMobile : [],
      id : " ",
      idAsStringg : " ",
      images : " ",
      pass : " ",
      status : 0,
      website : " ",
    }];
    this.getAllAgent();
  }

  getAllAgent() {
    this._agentService.getAllAgents().subscribe(
      data => {
        this.agents=data;
        // console.log(data);
        this.dtTrigger.next();
      }, error => {
        console.log(error);
      }
    );
  }

  viewDetails(agentId : string) {
    localStorage.setItem("agentIdForPackage",agentId);
    this.router.navigate(["admin/package"]);
  }
}
