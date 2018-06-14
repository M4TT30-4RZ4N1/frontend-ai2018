import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../../../../models/transaction';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent implements OnInit {
  counter: number;
  transaction$ : Observable<Transaction[]>
  constructor( private adminService: AdminService) { 
    this.transaction$ = this.adminService.getCustomerData();
  }

  ngOnInit() {
    this.counter = 0;
  }

}
