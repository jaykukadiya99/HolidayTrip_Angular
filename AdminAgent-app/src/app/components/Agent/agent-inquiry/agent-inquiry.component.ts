import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InquiryService } from "../../../shared/Agent/inquiry.service";
@Component({
  selector: 'app-agent-inquiry',
  templateUrl: './agent-inquiry.component.html',
  styleUrls: ['./agent-inquiry.component.css']
})
export class AgentInquiryComponent implements OnInit {

  constructor(private router:Router,private _inquiryService:InquiryService) { }

  ngOnInit() {
    this.getAllInquiryDetails();
  }

  getAllInquiryDetails() {
    this._inquiryService.getAllInquiry().subscribe(
      data=>{
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
  }
}
