import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem("AgentToken");
    localStorage.removeItem("AgentId");    
    // window.alert("Logged Out Successfully");
    swal.fire("Logged Out Successfully");
    this.routes.navigate(["/login"]);
 }
}
