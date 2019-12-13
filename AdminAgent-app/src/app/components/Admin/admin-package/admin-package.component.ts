import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../shared/admin/admin.service";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import swal from "sweetalert2";

@Component({
  selector: 'app-admin-package',
  templateUrl: './admin-package.component.html',
  styleUrls: ['./admin-package.component.css']
})
export class AdminPackageComponent implements OnInit {

  public packages:any;
  constructor(private router:Router,private _agentService:AdminService) { }
  dtTrigger: Subject<any> = new Subject();
  public baseUri:string="http://localhost:58030/Resources";

  ngOnInit() {
    if(localStorage.getItem("agentIdForPackage") === null){
      // window.alert("Please select agent first");
      swal.fire("Please select agent first");
      this.router.navigate(["admin/agent"]);
    } else {
      this.packages=[{
        agentId : " ",
        brochure : " ",
        categoryId : [],
        cityIncluded : [],
        days : 0,
        description : " ",
        exclusion : " ",
        fixedDepartureDate : " ",
        id : " ",
        idAsString : " ",
        inclusion : " ",
        insertedDate : " ",
        itinerary : [{
          title : " ",
          description : " ",
          images : " "
        }],
        mainImage : " ",
        otherInfo : " ",
        price : 0,
        priceDesc : " ",
        status : 1,
        tandC : " ",
        title : " ",
        trendingRank: 0
      }];
      this.getPackage();
    }
  }

  getPackage() {
    let agntId = localStorage.getItem("agentIdForPackage");
    this._agentService.getAllPackage(agntId).subscribe(
      data => {
        // console.log(data);
        localStorage.setItem("agnt",agntId);
        localStorage.removeItem("agentIdForPackage");
        this.packages = data;
        this.dtTrigger.next();
      }, error => {
        console.log(error);
      }
    );
  }

  changeStatus(packageId : any,packageStatus : any){
    let newStatus:any;
    if(packageStatus==1) {
      newStatus=0;
    } else if(packageStatus==0) {
      newStatus=1;
    }
    this._agentService.togglePackgeStatus(packageId,newStatus).subscribe(
      data => {
        // console.log(data);
        // window.alert("Status Changed");
        swal.fire("Status Changed");
        let agnt = localStorage.getItem("agnt");
        localStorage.setItem("agentIdForPackage",agnt);
        this.getPackage();
      }, error => {
        console.log(error);
      }
    );
  }
}
