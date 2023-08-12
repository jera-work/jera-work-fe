import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'job-card',
  template: `
    <p-card
      class="w-full relative cursor-pointer"
      styleClass="hover:shadow-4"
      routerLink="/job/2"
    >
      <span class="absolute top-0 right-0 mr-3 mt-3">
        <i class="pi pi-clock"></i>
        Today
      </span>
      <div class="flex flex-row">
        <div class="mr-4">
          <img
            src="/assets/company.svg"
            class="w-10rem sm:w-13rem"
            alt="company"
          />
        </div>
        <div class="flex flex-column w-6 flex-1">
          <!-- Job Vacancy Title -->
          <div
            style="border-bottom: 1px solid black"
            class="flex flex-column row-gap-2 mb-1"
          >
            <span class="text-3xl font-bold">Live Host</span>
            <div>
              <span class="font-semibold">
                <i class="pi pi-building"> </i>
                LiLaine Official
              </span>
            </div>
            <div>
              <span class="font-medium">
                <i class="pi pi-money-bill"></i>
                4-6 Juta / bulan
              </span>
            </div>
          </div>

          <!-- Job Vacancy Detail -->
          <div class="flex column-gap-2 md:column-gap-5 flex-wrap">
            <span>
              <i class="pi pi-user"></i>
              SMA/SMK
            </span>
            <span>
              <i class="pi pi-briefcase"></i>
              Full Time
            </span>
            <span>
              <i class="pi pi-map-marker"></i>
              Jakarta Pusat
            </span>
          </div>
        </div>
      </div>
    </p-card>
  `,
  imports: [CardModule],
  standalone: true,
})
export class JobCardComponent {
  @Input() time = '';
  @Input() title = '';
  @Input() company = '';
  @Input() companyImg = '';
  @Input() salary = '';
  @Input() degree = '';
  @Input() jobType = '';
  @Input() location = '';
  @Input() routerLink = '';
}
