import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loginLogoutText : string;
  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("customerId") === null) {
      this.loginLogoutText = "Login";
    } else {
      this.loginLogoutText = "Logout";
    }
  }
  
  loginLogoutFunc(){
    if(this.loginLogoutText == "Login") {
      this.router.navigate(["customerLogin"]);
    } else {
      localStorage.removeItem("jwt");
      localStorage.removeItem("customerId");
      this.loginLogoutText = "Login";
      // window.alert("You are logged out");
      swal.fire('You are logged out');
      this.router.navigate([""]);
    }
  }

}
