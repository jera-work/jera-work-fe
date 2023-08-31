import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { EmployeesResDto } from '@dto/employees/employees.res.dto';
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

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {}
}
