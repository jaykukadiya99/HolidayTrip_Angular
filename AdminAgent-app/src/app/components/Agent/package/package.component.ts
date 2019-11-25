import { Component, OnInit } from '@angular/core';
import { PackageService } from "../../../shared/Agent/package.service";
import { Package } from "../../../Models/package";
import { Router } from "@angular/router";

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  private packages:any;
  constructor(private _packageSerive:PackageService, private router:Router) { }

  ngOnInit() {
    this.readPackge();
  }

  readPackge() {
    this._packageSerive.getAllPackage().subscribe(
      data=> {
        this.packages=data;
        console.log(this.packages);
      },
      error=>{
        console.log(error);
      }
    )
  }

  newPackage(event:any) {
    event.preventDefault();
    this._packageSerive.setter(new Package());
    this.router.navigate(["agent/package/create"]);
  }
}
