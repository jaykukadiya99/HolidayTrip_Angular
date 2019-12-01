import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { PackageService } from "../../Shared/package.service";
import { InquiryService } from "../../Shared/inquiry.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private packages:any;
  items = [];
  pageOfItems: Array<any>;
  public inqAbout:string;
  public inqPerson:string;
  public forArray = [1,2,3,4];
  public baseUri:string = "http://localhost:58030/Resources";
  constructor(private router : Router,private jwtHelper : JwtHelperService, private _packageService : PackageService, private _inquiryService : InquiryService) { }
  ngOnInit() {
    this.loadPackages();
    this.inqAbout="";
    this.inqPerson="";
    // this.items = Array(50).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  
  generateInquiry(agentId : string, packageId : string){
    // console.log(agentId, packageId, inqPerson, inqAbout);
    let objInq : any = { CustomerId:"", AgentId: "", PackageId : "", Person: "", InquiryAbout : ""};

    // objInq.AgentId=agentId;
    // objInq.PackageId=packageId;
    // objInq.Person=this.inqPerson;
    // objInq.InquiryAbout=this.inqAbout;
    // console.log(objInq);
    // this.inqAbout="";
    // this.inqPerson="";
    let custId: string = localStorage.getItem("customerId");
    if(custId === null) {
      window.alert("Try to login first");
      // window.open("/customerLogin","_self");
      this.router.navigate(["/customerLogin"]);
    } else {
      objInq.AgentId=agentId;
      objInq.PackageId=packageId;
      objInq.Person=this.inqPerson;
      objInq.InquiryAbout=this.inqAbout;
      objInq.CustomerId=custId;
      // console.log(objInq);
      this._inquiryService.generateInquiry(objInq).subscribe(
        data => {
          console.log(data);
          this.inqAbout=" ";
          this.inqPerson=" "; 
          window.alert("Agent will contact you soon.");
        }, error => {
          console.log(error);
        }
      );
    }
  }

  // clickWishList(){
  //   let custId: string = localStorage.getItem("customerId");
  //   if(custId === null) {
  //     localStorage.setItem["action"] = "close";
  //     window.open(window.location.href+"customerLogin","_blank");
  //   } else {
  //     //wishlist logic
  //   } 
  // }

  loadPackages() {
    this._packageService.getAllPackage().subscribe(
      data => {
        this.packages=data;
        // for (let index = 0; index < this.packages.length; index++) {
        //   console.log(this.packages[index].package);
        // }
        this.items = this.packages;
        // console.log(this.packages);
      }, error => {
        console.log(error);
      }
    )
  }
}
