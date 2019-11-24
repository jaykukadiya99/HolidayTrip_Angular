import { Component, OnInit } from '@angular/core';
import { PackageService } from "../../../shared/Agent/package.service";

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  constructor(private _packageSerive:PackageService) { }

  ngOnInit() {
    this.readPackge();
  }

  readPackge() {
    this._packageSerive.getAllPackage().subscribe(
      data=> {
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
