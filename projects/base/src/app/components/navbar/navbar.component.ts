import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Roles } from '@constant/role.constant';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  imgUrl = '';
  roleCode: string | undefined = '';
  navbar: MenuItem[] | undefined;
  profile: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const profile = this.authService.getProfile();

    if (profile) {
      if (profile?.photoId) {
        this.imgUrl = `http://localhost:8080/files/${profile.photoId}`;
      } else {
        this.imgUrl = '/assets/default.png';
      }
      this.roleCode = profile?.roleCode;
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }

    this.navbar = [
      {
        label: 'JERA-WORK',
        routerLink: '/dashboard',
        id: 'dashboard',
        styleClass: 'test',
        icon: 'pi pi-fw pi-slack pi-spin text-white',
      },
      {
        label: 'Applied Job',
        routerLink: '/applied-job',
      },
      {
        label: 'Saved Job',
        routerLink: '/saved-job',
      },
      {
        label: 'Master Data',
        visible: this.isAdmin || this.isHr || this.isReviewer,
        items: [
          {
            label: 'User',
            routerLink: '/users',
            visible: this.isAdmin || this.isHr,
          },
          {
            label: 'Question',
            routerLink: '/questions',
            visible: this.isReviewer,
          },
          {
            label: 'Question Packet',
            routerLink: '/questions/packet',
            visible: this.isHr,
          },
          {
            label: 'Question Topic',
            routerLink: '/questions/topic',
            visible: this.isReviewer,
          },
        ],
      },
    ];

    this.profile = [
      {
        label: 'Profile',
        routerLink: '/users/profile',
      },
      {
        label: 'Change Password',
        routerLink: '/users/changepassword',
      },
      {
        label: 'Logout',
        command: () => this.onLogout(),
      },
    ];
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  get isHr() {
    return Roles.HR === this.roleCode;
  }

  get isReviewer() {
    return Roles.REVIEWER === this.roleCode;
  }

  get isAdmin() {
    return Roles.SUPER_ADMIN === this.roleCode;
  }

  get isCandidate() {
    return Roles.CANDIDATE === this.roleCode;
  }
}
