import { Component, OnInit } from '@angular/core';
import { PackageService } from "../../../shared/Agent/package.service";
import { Package } from "../../../Models/package";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {

  private packages:Package;
  constructor(private _packageService:PackageService, private router:Router) { }

  ngOnInit() {
    this.packages=this._packageService.getter();
  }

}
