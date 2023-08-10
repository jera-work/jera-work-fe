import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  fullName: string = '';

  ingredient!: string;

  // responsiveOptions: any[] | undefined;

  // constructor(private authService: AuthService) {}

  // ngOnInit(): void {
  //   const profile = this.authService.getProfile();
  //   if (profile) {
  //     this.fullName = profile.fullName;
  //   }
  // }

  jobs = [
    {
      title: 'Accounting Staff',
      company: 'Bearology Cafe',
      degree: 'S1',
      type: 'Full Time',
      image: 'bamboo-watch.jpg',
      location: 'Jakarta Pusat',
    },
    {
      title: 'Staff Admin',
      company: 'Berkat Mandiri',
      degree: 'S1',
      type: 'Full Time',
      image: 'bamboo-watch.jpg',
      location: 'Jakarta Utara',
    },
    {
      title: 'Barista',
      company: 'Bearology Cafe',
      degree: 'SMA/SMK',
      type: 'Part Time',
      image: 'bamboo-watch.jpg',
      location: 'Jakarta Pusat',
    },
    {
      title: 'Marketing',
      company: 'PT. Naga Mulia',
      degree: 'SMA/SMK',
      type: 'Full Time',
      image: 'bamboo-watch.jpg',
      location: 'Jakarta Barat',
    },
    {
      title: 'Host Live',
      company: 'PT. Naga Mulia',
      degree: 'SMA/SMK',
      type: 'Full Time',
      image: 'bamboo-watch.jpg',
      location: 'Jakarta Barat',
    },
  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return '';
  }
}
