import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { PackageService } from "../../Shared/package.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private packages:any;
  items = [];
  pageOfItems: Array<any>;
  public forArray = [1,2,3,4];
  public baseUri:string = "http://localhost:58030/Resources";
  constructor(private router : Router,private jwtHelper : JwtHelperService, private _packageService : PackageService) { }
  ngOnInit() {
    this.loadPackages();
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
  
  generateInquiry(){
    let custId: string = localStorage.getItem("customerId");
    if(custId === null) {
      localStorage.setItem["action"] = "close";
      window.open(window.location.href+"customerLogin","_blank");
    } else {
      //generate inquiry logic
    }
  }

  clickWishList(){
    let custId: string = localStorage.getItem("customerId");
    if(custId === null) {
      localStorage.setItem["action"] = "close";
      window.open(window.location.href+"customerLogin","_blank");
    } else {
      //wishlist logic
    } 
  }

  loadPackages() {
    this._packageService.getAllPackage().subscribe(
      data => {
        this.packages=data;
        this.items = this.packages;
        // console.log(this.packages);
      }, error => {
        console.log(error);
      }
    )
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
  }
}
