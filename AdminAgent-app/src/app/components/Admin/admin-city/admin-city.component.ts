import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CityService } from "../../../shared/City/city.service" ;
import { City } from "../../../Models/city";
import { AdminService } from "../../../shared/admin/admin.service";
import { Subject } from 'rxjs';
import swal from "sweetalert2";
import { DataTableDirective } from 'angular-datatables';
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-admin-city',
  templateUrl: './admin-city.component.html',
  styleUrls: ['./admin-city.component.css']
})
export class AdminCityComponent implements OnInit {
  @ViewChild(DataTableDirective, { static : true}) dtElement : DataTableDirective;
  private cities : any;
  constructor(private _cityService:CityService,private router : Router, private _adminService : AdminService) { }
  private cityAdd :City = new City();
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {    
    this.getCitys();
  }

  getCitys(){
    this._cityService.getAllCity().subscribe(
      data=>{
        this.cities=data;
        this.rerender();
        // console.log(this.cities);
      },
      err =>
      {
        console.log(err);
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

  addNewCity(){
    this._cityService.addNewCity(this.cityAdd).subscribe(
      data=>
      {
        this.rerender();
        // console.log(data);
        // window.alert("City inserted Successfully.");
        swal.fire("City inserted Successfully.");
        this.cityAdd = new City();
        this.getCitys();
      },
      err=>
      {
        console.log(err);
      }
    )
  }

  deleteCity(id:string){    
    this._cityService.deleteCity(id).subscribe(
      data=>
      {
        this.rerender();
        // console.log(data);
        this.getCitys();
        // window.alert("City deleted.");
        swal.fire("City deleted.");
      },
      err=>{
        console.log(err);
      }
    );
  }

  updateCity(event:any,citysId:any){
    let nCity = event.target.txtCity.value;
    let cityObj : any = {
      id : citysId,
      CityName : nCity
    }
    // console.log(cityObj);
    let fromsData = new FormData();
    fromsData.append("data",JSON.stringify(cityObj));
    this._adminService.changeCity(citysId,fromsData).subscribe(
      data => {
        // console.log(data);
        // window.alert("City Updated.");
        swal.fire("City Updated.");
        this.router.navigate(["/admin/city"]);
      }, error => {
        console.log(error);
      }
    );
  }

  reloadData(){
    this.getCitys();
  }
}
