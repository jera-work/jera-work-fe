import { Component, OnInit } from "@angular/core";
import { CompanyResDto } from "@dto/company/company.res.dto";
import { Table } from "primeng/table";

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html',
  })
export class CompanyListComponent implements OnInit{

  loading = true

  companies : CompanyResDto[] = []
  
  ngOnInit(): void {
    this.loading = false
  }

  clear(table : Table){
    table.clear()
  }
}