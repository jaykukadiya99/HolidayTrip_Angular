import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit() {
    if (localStorage.getItem("AdminId") === null) {  
      this.routes.navigate(["/admin"]);
    }
  }

  logOut() {
    localStorage.removeItem("AdminId");   
    swal.fire("Logged Out."); 
    this.routes.navigate(["/admin"]);
 }
}
