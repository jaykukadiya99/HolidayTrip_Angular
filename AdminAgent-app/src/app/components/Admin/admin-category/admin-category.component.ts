import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CategoryService } from "../../../shared/Category/category.service";
import { Category } from "../../../Models/category";


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  private categoryAdd : Category = new Category();
  private categories:any;
  constructor(private _categoryService:CategoryService,private router :Router) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(){
    this._categoryService.getAllCategory().subscribe(
      data=>
      {
        this.categories=data;
      },
      err=>{
        console.log(err);
      }
    )
  }

  addNewCategory(){
    this._categoryService.addNewCategory(this.categoryAdd).subscribe(
      data=>{
        //console.log(data);
        window.alert("Category Inserted");
        this.categoryAdd=new Category();
        this.getCategory();
      },
      err=>
      {
        console.log(err);
      }
    )
  }

  deleteCategory(id){
    this._categoryService.deleteCategory(id).subscribe(
      data=>
      {
        //console.log(data);
        this.getCategory();
      },
      err=>
      {
        console.log(err);
      }
    )
  }
}
