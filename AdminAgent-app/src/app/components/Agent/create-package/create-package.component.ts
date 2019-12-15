import { Component, OnInit } from '@angular/core';
import { PackageService } from "../../../shared/Agent/package.service";
import { Package } from "../../../Models/package";
import { Router } from "@angular/router";
import { CityService } from "../../../shared/City/city.service";
import { CategoryService } from "../../../shared/Category/category.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {
  private packages:Package;
  public itineraries:any[]=new Array();
  public itineraryObj:any= { Title : "", Description : "" };
  public itineryImg;
  public MainImage;
  public Brochure;
  public selectCities:any;
  public selectCategories:any;
  public cityArray:any[] = new Array();
  public categoryArray:any[] = new Array();
  public formsData:FormData = new FormData();
  constructor(private _packageService:PackageService, 
    private _cityService:CityService, 
    private _categoryService:CategoryService, 
    private router:Router) { }

  ngOnInit() {
    this.cityArray=[];
    this.categoryArray=[];
    this._packageService.setter(new Package());
    this.packages=this._packageService.getter();
    this.packages.Days=1;
    this._cityService.getAllCity().subscribe(
      data => {
        this.selectCities = data;
        // console.log(this.selectCities);
      }, error => {
        console.log(error);
      }
    )
    this._categoryService.getAllCategory().subscribe(
      data => {
        this.selectCategories = data;
        // console.log(this.selectCategories);
      }, error => {
        console.log(error);
      }
    )
  }

  AddItinerary(){
    this.itineraryObj.img = this.itineryImg;
    this.itineraries.push(this.itineraryObj);
    let title = this.itineraryObj.Title;
    this.formsData.append(this.itineraryObj.Title,this.itineraryObj.img[0],this.itineraryObj.img[0]["name"]);
    // console.log(this.itineraries);
    this.itineraryObj= { Title : "", Description : "" };
    swal.fire(title+" is added");
    return;
  }

  createPackage(){
    this.packages.CategoryId = this.categoryArray;
    this.packages.CityIncluded = this.cityArray;

    for(let i=0; i<this.itineraries.length ; i++){
      console.log(i);
      this.itineraries[i]={"Title":this.itineraries[i].Title, "Description" : this.itineraries[i].Description};
    }

    this.formsData.append("MainImage",this.MainImage[0],this.MainImage[0]["name"]);
    this.formsData.append("Brochure",this.Brochure[0],this.Brochure[0]["name"]);
    this.packages.Itinerary=this.itineraries;
    this.formsData.append("data",JSON.stringify(this.packages));
    
    this._packageService.insertPackage(this.formsData).subscribe(
      data=> {
        // console.log(data);
        // window.alert("Package Inserted Successfully.");
        swal.fire("Package Inserted Successfully.");
        this.router.navigate([""]);
      }, error => {
        console.log(error);
      }
    )
  }

  changeImage(files, index, event) {
    if(index==0){
      this.MainImage=<Array<File>>event.target.files;
    } else {
      this.Brochure=<Array<File>>event.target.files;
    }
  }  

  changeIImage(files,event) {
    this.itineryImg=<Array<File>>event.target.files;
  }

  onCitySelected(value:string) {
    if(this.cityArray.length==0) {
      this.cityArray.push(value);
    } else {
      if(this.cityArray.includes(value)) {
        let ind = this.cityArray.indexOf(value);
        this.cityArray.splice(ind,1);
      } else {
        this.cityArray.push(value)
      }
    }
    // console.log(this.cityArray);
  }

  onCategorySelected(value:string) {
    if(this.categoryArray.length==0) {
      this.categoryArray.push(value);
    } else {
      if(this.categoryArray.includes(value)) {
        let ind = this.categoryArray.indexOf(value);
        this.categoryArray.splice(ind,1);
      } else {
        this.categoryArray.push(value)
      }
    }
    // console.log(this.categoryArray);
  }
}
