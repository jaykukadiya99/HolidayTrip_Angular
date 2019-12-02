import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { PackageService } from "../../Shared/package.service";
import { InquiryService } from "../../Shared/inquiry.service";
import { CategoryService } from "../../Shared/category.service";
import { CityService } from "../../Shared/city.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DatePipe]
})
export class DashboardComponent implements OnInit {

  private packages:any;  
  items = [];
  pageOfItems: Array<any>;
  public inqAbout:string;
  public inqPerson:string;
  public allCity:any;
  public allCategory:any;
  public tripCityD:string;
  public tripCategoryD:string;
  public tripDaysD:string;
  public forArray = [1,2,3,4];
  public baseUri:string = "http://localhost:58030/Resources";
  
  constructor(private router : Router,
    private jwtHelper : JwtHelperService, 
    private _packageService : PackageService, 
    private _inquiryService : InquiryService, 
    private _cityService: CityService, 
    private _categoryService:CategoryService) { }

  ngOnInit() {
    this.packages= [{
      agent: [{
        agencyAddress: {
          addressLine1 : " ",
          addressLine2 : " ",
          area : " ",
          city : " ",
          pincode : " ",
          state : " "
        },
        agencyEmail: " ",
        agencyName : " ",
        agentName : " ",
        contactMobile : [],
        id : " ",
        idAsString : " ",
        images : " ",
        pass : " ",
        status : 0,
        website : ""
      }],
      package: {
        agentId : " ",
        brochure : " ",
        categoryId : [],
        cityIncluded : [],
        days : 1,
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
        trendingRank : 0
      }
    }];
    this.loadPackages();
    this.tripCategoryD="selectcategory";
    this.tripCityD="selectcity";
    this.tripDaysD="0";
    this.inqAbout="";
    this.inqPerson="";
    this._cityService.getAllCity().subscribe(
      data=>{
        this.allCity=data;
        // console.log(this.allCity);
      }, error=>{
        console.log(error);
      }
    );
    this._categoryService.getAllCategory().subscribe(
      data=>{
        this.allCategory=data;
        // console.log(this.allCategory);
      }, error=>{
        console.log(error);
      }
    );
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
          // console.log(data);
          this.inqAbout=" ";
          this.inqPerson=" "; 
          window.alert("Thank you...! Agent will contact you soon.");
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
    );
  }

  applyFilter() {
    let filterObj:any = {
      CityIncluded : [this.tripCityD],
      CategoryId : [this.tripCategoryD],
      Days : this.tripDaysD
    }
    // console.log(filterObj);
    var formsdata = new FormData();
    formsdata.append("filter",JSON.stringify(filterObj));
    this._packageService.getFilteredData(formsdata).subscribe(
      data => {
        // console.log(data);
        let dataObj:any = data;
        if(dataObj.msg=="filter Data") {
          window.alert("Great...!! Matched Your Criterial.");
        } else {
          window.alert("Doesn't found Exact Result.");
        }
        this.packages=dataObj.data;
        this.items = this.packages;
      }, error => {
        console.log(error);
      }
    );
  }

  clearFilter() {
    this.loadPackages();
  }
}
