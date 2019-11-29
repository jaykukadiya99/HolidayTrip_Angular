import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit() {

  }

  logOut() {
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("AdminId");    
    this.routes.navigate(["/admin"]);
 }
}
