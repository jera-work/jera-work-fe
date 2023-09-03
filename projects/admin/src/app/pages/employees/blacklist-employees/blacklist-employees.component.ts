import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EmployeesResDto } from '@dto/employees/employees.res.dto';

@Component({
  selector: 'blacklist-employees',
  templateUrl: 'blacklist-employees.component.html',
  styleUrls: ['blacklist-employees.styles.css'],
})
export class BlacklistEmployeesComponent implements OnInit {
  blacklistEmployees!: EmployeesResDto[];

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Blacklist Employees');
  }
}
