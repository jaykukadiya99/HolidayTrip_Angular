import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../shared/admin/admin.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public totAgents: any;
  public totUsers: any;
  constructor(private _adminService : AdminService) { }

  ngOnInit() {
    this.totAgents=0;
    this.totUsers=0;
    this._adminService.getTotCount().subscribe(
      data => {
        let dataObj : any = data;
        this.totAgents=dataObj.totalAgent;
        this.totUsers=dataObj.totalUser;
      }, error => {
        console.log(error);
      }
    );
  }
}
