import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CustomerService } from "../../Shared/customer.service";
import { ActivatedRoute, Router } from '@angular/router';
import { analyzeFile } from '@angular/compiler';
@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,private fb: FormBuilder,private cs :CustomerService) { 
    this.createForm();
  }

  ngOnInit() {
  }
  
  createForm() {
    this.angForm = this.fb.group({
      Mobile: ['', Validators.required ],
    });
  }

  customerLogin(name) {
        this.cs.addBook(name).subscribe(
      data=> {
        console.log(data);        
      }, error => {
        console.log(error);
      }
    )
        this.router.navigate(['']);
      }
}
