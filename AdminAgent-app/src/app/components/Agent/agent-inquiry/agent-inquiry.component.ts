import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InquiryService } from "../../../shared/Agent/inquiry.service";
import { Subject } from 'rxjs';
import swal from "sweetalert2";

@Component({
  selector: 'app-agent-inquiry',
  templateUrl: './agent-inquiry.component.html',
  styleUrls: ['./agent-inquiry.component.css']
})
export class AgentInquiryComponent implements OnInit {

  public inquiry:any;
  constructor(private router:Router,private _inquiryService:InquiryService) { }
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.getAllInquiryDetails();
  }

  getAllInquiryDetails() {
    this._inquiryService.getAllInquiry().subscribe(
      data=>{
        this.inquiry=data;
        // console.log(data);
        this.dtTrigger.next();
      }, error => {
        console.log(error);
      }
    );
  }

  viewDetails(custId : string){
    // console.log(custId);
    let custDetail:any;
    this._inquiryService.getSpecificCustomer(custId).subscribe(
      data => {
        custDetail = data;
        // window.alert("Customer Name: "+custDetail.firstName+"\nContact: "+custDetail.mobile+"\nEmail: "+custDetail.email);
        swal.fire("Customer Name: "+custDetail.firstName+"\nContact: "+custDetail.mobile+"\nEmail: "+custDetail.email);
        // console.log(custDetail.firstName);
      }, error => {
        console.log(error);
      }
    );
  }

  changeStatus(inqId:string) {
    console.log(inqId);
    this._inquiryService.setInquiryCompleted(inqId).subscribe(
      data=>{
        // console.log(data);
        // window.alert("Good...! Inquiry marked as Completed.");
        swal.fire("Good...! Inquiry marked as Completed.");
        this.getAllInquiryDetails();
      }, error=> {
        console.log(error);
      }
    )
  }
}
