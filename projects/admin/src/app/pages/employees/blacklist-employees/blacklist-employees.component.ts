import { Component } from '@angular/core';
import { EmployeesResDto } from '@dto/employees/employees.res.dto';

@Component({
  selector: 'blacklist-employees',
  templateUrl: 'blacklist-employees.component.html',
  styleUrls: ['blacklist-employees.styles.css'],
})
export class BlacklistEmployeesComponent {
  blacklistEmployees!: EmployeesResDto[];
}
