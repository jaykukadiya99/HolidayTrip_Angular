import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { InquiryService } from "../../Shared/inquiry.service";

@Component({
  selector: 'app-myinquiry',
  templateUrl: './myinquiry.component.html',
  styleUrls: ['./myinquiry.component.css']
})
export class MyinquiryComponent implements OnInit {

  public inquiry:any;
  constructor(private router:Router,
    private _inquiryService:InquiryService) { }

  ngOnInit() {
    this.getAllInquiry();
  }

  getAllInquiry(){
    let custId: string = localStorage.getItem("customerId");
    this._inquiryService.getAllInquiry(custId).subscribe(
      data => {
        this.inquiry=data;
        // console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  viewDetails(agentId : string){
    // console.log(custId);
    let agentDetail:any;
    this._inquiryService.getInquiryAgent(agentId).subscribe(
      data => {
        agentDetail = data;
        window.alert("Agency Name: "+agentDetail.agencyName+"\nContact: "+agentDetail.contactMobile+"\nEmail: "+agentDetail.agencyEmail+"\nAddress: "+agentDetail.agencyAddress.addressLine1+", "+agentDetail.agencyAddress.addressLine2+", "+agentDetail.agencyAddress.area+", "+agentDetail.agencyAddress.city+", "+agentDetail.agencyAddress.pincode+", "+agentDetail.agencyAddress.state+".");
        // console.log(agentDetail);
      }, error => {
        console.log(error);
      }
    );
  }
}
