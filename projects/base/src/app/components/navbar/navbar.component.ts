import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Roles } from '@constant/role.constant';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  imgUrl = '';
  roleCode: string | undefined = '';
  navbar: MenuItem[] | undefined;
  profile: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const profile = this.authService.getProfile();
    if (profile?.photoId) {
      this.imgUrl = `http://localhost:8080/files/${profile.photoId}`;
    } else {
      this.imgUrl = 'http://localhost:8080/files/1';
    }
    this.roleCode = profile?.roleCode;

    this.navbar = [
      {
        label: 'Bootcamp Test',
        routerLink: '/dashboard',
        style: {
          color: 'white',
        },
        styleClass: 'text-white',
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
      {
        label: 'Assign Candidate',
        routerLink: '/assign-candidate',
        visible: this.isHr,
      },
      {
        label: 'Candidate Answer',
        routerLink: '/candidates/files',
        visible: this.isCandidate,
      },
      {
        label: 'Review',
        routerLink: '/reviews',
        visible: this.isReviewer,
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
