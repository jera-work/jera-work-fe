import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Roles } from '@constant/role.constant';
import { AuthService } from '@services/auth.service';
import { ADMIN_API, CANDIDATE_API } from '@constant/api.constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  imgUrl = '';
  roleCode: string | undefined = '';
  isAdminApp = false;
  navbar: MenuItem[] | undefined;
  profile: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const profile = this.authService.getProfile();

    if (profile) {
      if (profile.roleCode) {
        if (profile?.photoId) {
          this.imgUrl = `${ADMIN_API}/files/${profile.photoId}`;
        } else {
          this.imgUrl = '/assets/default.png';
        }
        this.roleCode = profile?.roleCode;
        this.isAdminApp = true;
      } else {
        this.isAdminApp = false;
        if (profile?.photoId) {
          this.imgUrl = `${CANDIDATE_API}/files/${profile.photoId}`;
        } else {
          this.imgUrl = '/assets/default.png';
        }
      }

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
        visible: !this.isAdminApp,
      },
      {
        label: 'Saved Job',
        routerLink: '/saved-job',
        visible: !this.isAdminApp,
      },
      {
        label: 'Users',
        routerLink: '/users',
        visible: this.isAdminApp && (this.isAdmin || this.isSuperAdmin),
      },

      {
        label: 'Companies',
        routerLink: '/companies',
        visible: this.isAdminApp && this.isSuperAdmin,
      },

      {
        label: 'Job Vacancies',
        routerLink: '/job-vacancies',
        visible: this.isAdminApp && (this.isAdmin || this.isHr || this.isUser),
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

  get isUser() {
    return Roles.USER === this.roleCode;
  }

  get isAdmin() {
    return Roles.ADMIN === this.roleCode;
  }

  get isSuperAdmin() {
    return Roles.SUPER_ADMIN === this.roleCode;
  }

  get isCandidate() {
    return Roles.CANDIDATE === this.roleCode;
  }
}
