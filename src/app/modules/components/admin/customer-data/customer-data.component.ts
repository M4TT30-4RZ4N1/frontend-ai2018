import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../../../../models/transaction';
import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent implements OnInit {
  transaction$ : Observable<Transaction[]>
  constructor( private adminService: AdminService) { 
    this.transaction$ = this.adminService.getCustomerData();
  }

  ngOnInit() {
  }

}
