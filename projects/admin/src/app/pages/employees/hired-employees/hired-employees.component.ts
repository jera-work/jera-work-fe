import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { EmployeesResDto } from '@dto/employees/employees.res.dto';
import { EmployeesService } from '@services/employees.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: '',
  templateUrl: './hired-employees.component.html',
  styleUrls: ['hired-employees.styles.css'],
})
export class HiredEmployeeComponent implements OnInit {
  hiredEmployees!: EmployeesResDto[];

  blacklistEmployeeInsertReqDto = this.fb.group({
    employeeId: ['', [Validators.required]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private employeesService: EmployeesService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Hired Employees');
    this.getData();
  }

  getData() {
    firstValueFrom(this.employeesService.getHiredEmployees()).then((res) => {
      this.hiredEmployees = res;
    });
  }
}
