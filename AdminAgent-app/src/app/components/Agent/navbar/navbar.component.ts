import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

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
    this.routes.navigate(["/login"]);
 }
}
