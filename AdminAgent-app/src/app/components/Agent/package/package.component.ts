import { Component, OnInit } from '@angular/core';
import { PackageService } from "../../../shared/Agent/package.service";
import { Package } from "../../../Models/package";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Subject } from 'rxjs';
import swal from "sweetalert2";
import { DataTableDirective } from 'angular-datatables';
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  providers:[DatePipe]
})
export class PackageComponent implements OnInit {
  @ViewChild(DataTableDirective, { static : true}) dtElement : DataTableDirective;
  private packages:any;
  public myDate = new Date();
  public newDate:any;
  public baseUri:string="http://localhost:58030/Resources";
  dtTrigger: Subject<any> = new Subject();

  constructor(private _packageSerive:PackageService, 
    private router:Router,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.newDate=this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    // console.log(this.newDate);
    this.readPackge();
  }

  readPackge() {
    this._packageSerive.getAllPackage().subscribe(
      data=> {
        this.packages=data;
        // console.log(this.packages);
        this.rerender();
      },
      error=>{
        console.log(error);
      }
    )
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
    });
  }
  
  ngAfterViewInit() {
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.on( 'draw.dt', function () {
            if(jQuery('.dataTables_empty').length > 0) {
                jQuery('.dataTables_empty').remove();
            }
        });
    });
  }

  newPackage(event:any) {
    event.preventDefault();
    this._packageSerive.setter(new Package());
    this.router.navigate(["package/create"]);
  }

  deletePackage(id:string){
    console.log(id);
    var dataObj :any;
    this._packageSerive.deletePackage(id).subscribe(
      data=>{
        this.rerender();
        // console.log(data);
        dataObj = data;  
        // window.alert("Package Deleted.");
        swal.fire("Package Deleted.");
        this.readPackge();     
      },
      error=>{
        console.log(error);
      }
    );

  }
}
