import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CityService } from "../../../shared/City/city.service" ;
import { City } from "../../../Models/city";


@Component({
  selector: 'app-admin-city',
  templateUrl: './admin-city.component.html',
  styleUrls: ['./admin-city.component.css']
})
export class AdminCityComponent implements OnInit {

  private cities : any;
  constructor(private _cityService:CityService,private router : Router) { }
  private cityAdd :City = new City();

  ngOnInit() {    
    this.getCitys();
  }

  getCitys(){
    this._cityService.getAllCity().subscribe(
      data=>{
        this.cities=data;
      },
      err =>
      {
        console.log(err);
      }
    )
  }

  addNewCity(){
    this._cityService.addNewCity(this.cityAdd).subscribe(
      data=>
      {
        console.log(data);
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
        console.log(data);
        this.getCitys();
        window.alert("city deleted");
      },
      err=>{
        console.log(err);
      }
    )
  }
}
