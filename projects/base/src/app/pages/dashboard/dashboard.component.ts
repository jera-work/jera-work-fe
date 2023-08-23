import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  fullName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const profile = this.authService.getProfile();
    if (profile) {
      this.fullName = profile.fullName;
    }
  }
}
