import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CompanyResDto } from '@dto/company/company.res.dto';
import { CompanyService } from '@services/company.service';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  loading = true;

  companies: CompanyResDto[] = [];

  constructor(private companyService: CompanyService, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Company List');

    this.loading = false;

    firstValueFrom(this.companyService.getAllCompany())
      .then((res) => {
        this.companies = res;
      })
      .catch((err) => console.log(err));
  }
}
