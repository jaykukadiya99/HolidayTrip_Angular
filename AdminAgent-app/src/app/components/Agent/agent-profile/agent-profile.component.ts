import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AgentLoginService } from "../../../shared/Agent/agent-login.service";
import { PackageService } from "../../../shared/Agent/package.service";

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class AgentProfileComponent implements OnInit {
  agentProfile: any = {
    agencyAddress: '',
    agentName: '',
    agencyName: '',
    agencyEmail: '',
    contactMobile: '',
    Website: '',
  };
  contactNumber = [];
  public imageAgency;
  public totPackages:any;
  public baseUri = "http://localhost:58030/Resources/";
  public contacts:string;
  constructor(private router: Router,
    private _agentService: AgentLoginService, private _packageService:PackageService) { }

  ngOnInit() {
    this.getAgent();
    this._packageService.getAllPackage().subscribe(
      data=>{
        this.totPackages=data;
        this.totPackages=this.totPackages.length;
        // console.log(this.totPackages);
      }, error => {
        console.log(error);
      }
    )
  }

  getAgent() {
    this._agentService.getAgent().subscribe(
      data => {
        this.agentProfile = data;
        this.contacts = this.agentProfile.contactMobile+'';
        //console.log(data);
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

    if(typeof(this.imageAgency) === "undefined")
    {
      console.log("image not");
    }    
    else
    {
      formsdata.append("agencyImage",this.imageAgency[0],this.imageAgency[0]["name"]);      
    }
    formsdata.append("data",JSON.stringify(this.agentProfile));
    
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
