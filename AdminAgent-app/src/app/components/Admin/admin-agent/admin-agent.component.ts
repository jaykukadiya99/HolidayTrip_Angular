import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../shared/admin/admin.service";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ViewChild } from "@angular/core";


@Component({
  selector: 'app-admin-agent',
  templateUrl: './admin-agent.component.html',
  styleUrls: ['./admin-agent.component.css']
})
export class AdminAgentComponent implements OnInit {
  @ViewChild(DataTableDirective, { static : true}) dtElement : DataTableDirective;
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
        this.rerender();
      }, error => {
        console.log(error);
      }
    );
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
    });
  }
  
  ngAfterViewInit() {
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.on( 'draw.dt', function () {
            if(jQuery('.dataTables_empty').length > 0) {
                jQuery('.dataTables_empty').remove();
            }
        });
    });
}

  viewDetails(agentId : string) {
    localStorage.setItem("agentIdForPackage",agentId);
    this.router.navigate(["admin/package"]);
  }
}
