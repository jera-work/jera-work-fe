import { Component, OnInit } from '@angular/core';
import { CompanyResDto } from '@dto/company/company.res.dto';
import { CompanyService } from '@services/company.service';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {
  loading = true;

  companies: CompanyResDto[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loading = false;

    firstValueFrom(this.companyService.getAllCompany())
      .then((res) => {
        console.log(res);
        this.companies = res;
      })
      .catch((err) => console.log(err));
  }
}
