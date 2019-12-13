import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CategoryService } from "../../../shared/Category/category.service";
import { Category } from "../../../Models/category";
import { AdminService } from "../../../shared/admin/admin.service";
import { Subject } from 'rxjs';
import swal from "sweetalert2";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  private categoryAdd : Category = new Category();
  private categories:any;
  constructor(private _categoryService:CategoryService,private router :Router, private _adminService : AdminService) { }
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.getCategory();
  }

  getCategory(){
    this._categoryService.getAllCategory().subscribe(
      data=>
      {
        this.categories=data;
        this.dtTrigger.next();
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
        // window.alert("Category inserted Successfully.");
        swal.fire("Category inserted Successfully.");
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
        // window.alert("Category Deleted.");
        swal.fire("Category Deleted.");
        this.getCategory();
      },
      err=>
      {
        console.log(err);
      }
    );
  }

  updateCategory(event:any,categoryId:any){
    let nCategory = event.target.txtCategory.value;
    let categoryObj : any = {
      id : categoryId,
      CategoryName : nCategory
    }
    console.log(categoryObj);
    let fromsData = new FormData();
    fromsData.append("data",JSON.stringify(categoryObj));
    this._adminService.changeCategory(categoryId,fromsData).subscribe(
      data => {
        // console.log(data);
        // this.getCitys();
        // window.alert("Category Updated");
        swal.fire("Category Updated");
        this.router.navigate(["/admin/category"]);
      }, error => {
        console.log(error);
      }
    );
  }

  reloadData(){
    this.getCategory();
  }
}
