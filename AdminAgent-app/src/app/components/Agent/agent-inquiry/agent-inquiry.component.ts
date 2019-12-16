import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InquiryService } from "../../../shared/Agent/inquiry.service";
import { Subject } from 'rxjs';
import swal from "sweetalert2";
import { DataTableDirective } from 'angular-datatables';
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-agent-inquiry',
  templateUrl: './agent-inquiry.component.html',
  styleUrls: ['./agent-inquiry.component.css']
})
export class AgentInquiryComponent implements OnInit {
  @ViewChild(DataTableDirective, { static : true}) dtElement : DataTableDirective;
  public inquiry:any;
  constructor(private router:Router,private _inquiryService:InquiryService) { }
  dtTrigger: Subject<any> = new Subject();

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
    this.getAllInquiryDetails();
  }

  getAllInquiryDetails() {
    this._inquiryService.getAllInquiry().subscribe(
      data=>{
        this.inquiry=data;
        // console.log(data);
        this.rerender();
      }, error => {
        console.log(error);
      }
    );
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

  viewDetails(custId : string){
    let custDetail:any;
    this._inquiryService.getSpecificCustomer(custId).subscribe(
      data => {
        custDetail = data;
        // window.alert("Customer Name: "+custDetail.firstName+"\nContact: "+custDetail.mobile+"\nEmail: "+custDetail.email);
        swal.fire("Customer Name: "+custDetail.firstName+"\nContact: "+custDetail.mobile+"\nEmail: "+custDetail.email);
        // console.log(custDetail);
      }, error => {
        console.log(error);
      }
    );
  }

  changeStatus(inqId:string) {
    console.log(inqId);
    this._inquiryService.setInquiryCompleted(inqId).subscribe(
      data=>{
        this.rerender();
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
