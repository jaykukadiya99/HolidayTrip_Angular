import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../shared/admin/admin.service";
import { Router } from "@angular/router";
import { Admin } from 'src/app/Models/admin';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private _adminLoginService :AdminService,
    private routes :Router) { }
    private admins : Admin = new Admin();
  ngOnInit() {
  }

  login(){
    this._adminLoginService.agentLogin(this.admins).subscribe()
  }
}
