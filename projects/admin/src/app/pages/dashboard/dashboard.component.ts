import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  profileName?: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const profile = this.authService.getProfile();
    console.log(profile);
    if (profile) {
      this.profileName = profile.profileName;
    }
  }
}
