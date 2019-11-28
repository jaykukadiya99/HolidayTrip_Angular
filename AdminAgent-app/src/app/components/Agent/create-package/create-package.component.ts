import { Component, OnInit } from '@angular/core';
import { PackageService } from "../../../shared/Agent/package.service";
import { Package } from "../../../Models/package";
import { Router } from "@angular/router";
import { CityService } from "../../../shared/City/city.service";

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {
  private packages:Package;
  public cities:string;
  private itineraries:any[]=new Array();
  public itineraryObj:any= { Title : "", Description : "" };
  public itineryImg;
  public MainImage;
  public Brochure;
  public selectCities:any;
  constructor(private _packageService:PackageService, private _cityService:CityService, private router:Router) { }

  ngOnInit() {
    this.packages=this._packageService.getter();
    this._cityService.getAllCity().subscribe(
      data => {
        this.selectCities = data;
        console.log(this.selectCities);
      }, error => {
        console.log(error);
      }
    )
  }

  AddItinerary(){
    this.itineraryObj.img = this.itineryImg;
    this.itineraries.push(this.itineraryObj);
    this.itineraryObj= { Title : "", Description : "" };
  }

  createPackage(){
    this.packages.CityIncluded=this.cities.split(",");
    let formsData = new FormData();
    formsData.append("MainImage",this.MainImage[0],this.MainImage[0]["name"]);
    formsData.append("Brochure",this.Brochure[0],this.Brochure[0]["name"]);
    for(let i=0; i<this.itineraries.length ; i++){
      // console.log(i)
      formsData.append("ItineryImg"+i,this.itineraries[i].img[0],this.itineraries[i].img[0]["name"]);
      this.itineraries[i]={"Title":this.itineraries[i].Title, "Description" : this.itineraries[i].Description};
    }
    this.packages.Itinerary=this.itineraries;
    formsData.append("data",JSON.stringify(this.packages));
    console.log(formsData);
    // this._packageService.insertPackage(formsData).subscribe(
    //   data=> {
    //     console.log(data);
    //   }, error => {
    //     console.log(error);
    //   }
    // )
  }

  changeImage(files, index, event) {
    var reader = new FileReader();
    // if (files[0].size > 2000000) {
    //   window.alert("Please upload image less than < 2 MB");
    //   return;
    // }

    if(index==0){
      this.MainImage=<Array<File>>event.target.files;
    } else {
      this.Brochure=<Array<File>>event.target.files;
    }
  }  

  changeIImage(files,event) {
    var reader = new FileReader();
    // if (files[0].size > 2000000) {
    //   window.alert("Please upload image less than < 2 MB");
    //   return;
    // }
    this.itineryImg=<Array<File>>event.target.files;
  }

}
