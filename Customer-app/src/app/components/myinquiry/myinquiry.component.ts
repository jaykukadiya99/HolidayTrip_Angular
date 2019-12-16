import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { InquiryService } from "../../Shared/inquiry.service";
import swal from "sweetalert2";

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
    this.inquiry=[{
      inq : {
        agentId:" ",
        customerId:" ",
        id: " ",
        inquiryAbout : " ",
        inquiryDate : " ",
        inquiryStatus : " ",
        packageId : " ",
        person : " "
      },
      pack : [{
        agentId : " ",
        brochure : " ",
        categoryId : [],
        cityIncluded : [],
        days : 0,
        description : " ",
        exclusion : " ",
        fixedDepartureDate : " ",
        id : " ",
        idAsString : " ",
        inclusion : " ",
        insertedDate : " ",
        itinerary : [{
          title : " ",
          description : " ",
          images : " "
        }],
        mainImage : " ",
        otherInfo : " ",
        price : 0,
        priceDesc : " ",
        status : 1,
        tandC : " ",
        title : " ",
        trendingRank: 0
      }]
    }];
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
    let agentDetail:any;
    this._inquiryService.getInquiryAgent(agentId).subscribe(
      data => {
        agentDetail = data;
        // window.alert("Agency Name: "+agentDetail.agencyName+"\nContact: "+agentDetail.contactMobile+"\nEmail: "+agentDetail.agencyEmail+"\nAddress: "+agentDetail.agencyAddress.addressLine1+", "+agentDetail.agencyAddress.addressLine2+", "+agentDetail.agencyAddress.area+", "+agentDetail.agencyAddress.city+", "+agentDetail.agencyAddress.pincode+", "+agentDetail.agencyAddress.state+".");
        swal.fire("Agency Name: "+agentDetail.agencyName+"\nContact: "+agentDetail.contactMobile+"\nEmail: "+agentDetail.agencyEmail+"\nAddress: "+agentDetail.agencyAddress.addressLine1+", "+agentDetail.agencyAddress.addressLine2+", "+agentDetail.agencyAddress.area+", "+agentDetail.agencyAddress.city+", "+agentDetail.agencyAddress.pincode+", "+agentDetail.agencyAddress.state+".");
        // console.log(agentDetail);
      }, error => {
        console.log(error);
      }
    );
  }
  
}
