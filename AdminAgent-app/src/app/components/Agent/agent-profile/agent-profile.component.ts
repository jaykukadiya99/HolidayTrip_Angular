import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AgentLoginService } from "../../../shared/Agent/agent-login.service";
import { PackageService } from "../../../shared/Agent/package.service";
import { CountTotalService } from "../../../shared/Agent/count-total.service";

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class AgentProfileComponent implements OnInit {
  agentProfile: any = {
    agencyAddress: {
      addressline1: " ",
      addressline2: " ",
      area: " ",
      pincode: " ",
      city: "",
      state: ""
    },
    agentName: '',
    agencyName: '',
    agencyEmail: '',
    contactMobile: '',
    Website: '',
  };
  contactNumber = [];
  public imageAgency;
  public totPackages: any;
  public totInquiry: any;
  public baseUri = "http://localhost:58030/Resources/";
  public contacts: string;
  constructor(private router: Router,
    private _agentService: AgentLoginService, private _packageService: PackageService, private _countTotalService: CountTotalService) { }

  ngOnInit() {
    this.getAgent();
    this._countTotalService.getTotalCount().subscribe(
      data => {
        // console.log(data);
        this.totPackages = data;
        this.totPackages = this.totPackages.totalPackage;
        this.totInquiry = data;
        this.totInquiry = this.totInquiry.totalInquiry;
      }, error => {
        console.log(error);
      }
    )
  }

  getAgent() {
    this._agentService.getAgent().subscribe(
      data => {
        this.agentProfile = data;
        this.contacts = this.agentProfile.contactMobile + '';
        //console.log(data);

        var jdata = JSON.parse(JSON.stringify(this.agentProfile));

        console.log(jdata.agencyAddress);
        if (jdata.agencyAddress === null) {
          // console.log("null")
          this.agentProfile.agencyAddress.addressLine1=""
          this.agentProfile.agencyAddress.addressLine2=""
          this.agentProfile.agencyAddress.area=""
          this.agentProfile.agencyAddress.city=""
          this.agentProfile.agencyAddress.state=""
          this.agentProfile.agencyAddress.pincode=""
        }
        else {
          if (jdata.agencyAddress.addressLine1 == null) {
            // console.log("add1")
            this.agentProfile.agencyAddress.addressLine1=""
          }
          if (jdata.agencyAddress.addressLine2 == null) {
            // console.log("add2")
            this.agentProfile.agencyAddress.addressLine2=""
          }
          if (jdata.agencyAddress.area == null) {
            // console.log("area")
            this.agentProfile.agencyAddress.area=""
          }
          if (jdata.agencyAddress.city == null) {
            // console.log("city")
            this.agentProfile.agencyAddress.city=""
          }
          if (jdata.agencyAddress.state == null) {
            // console.log("state")
            this.agentProfile.agencyAddress.state=""
          }
          if (jdata.agencyAddress.pincode == null) {
            // console.log("pincode")
            this.agentProfile.agencyAddress.pincode=""
          }
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  updateAgent() {

    // this.contactNumber = this.agentProfile.contactMobile.split(",");
    this.agentProfile.contactMobile = this.contacts.split(",");
    let formsdata = new FormData();

    if (typeof (this.imageAgency) === "undefined") {
      console.log("image not");
    }
    else {
      formsdata.append("agencyImage", this.imageAgency[0], this.imageAgency[0]["name"]);
    }
    formsdata.append("data", JSON.stringify(this.agentProfile));

    this._agentService.updateAgent(formsdata).subscribe(
      data => {
        window.alert("Your profile is updated");
        this.getAgent();
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }

  changeImage(files, event) {
    this.imageAgency = <Array<File>>event.target.files;
  }

}
