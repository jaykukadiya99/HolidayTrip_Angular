import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from "../../Models/customer";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  customers : any;
  constructor(private http:HttpClient,private jwtHelper :JwtHelperService) { }
  ngOnInit() {
    let token = localStorage.getItem("jwt");
    this.http.post("http://localhost:58030/api/Customer/login", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.customers = response;      
    }, err => {
      console.log(err)
    });
  }

}
