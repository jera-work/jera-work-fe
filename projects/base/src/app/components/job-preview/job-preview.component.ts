import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { UrlPipeAdmin } from '@pipes/url.pipe';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'job-preview',
  template: `
    <div class="jobpreview">
      <div class="min-h-screen w-10 m-auto">
        <div class="px-6 shadow-3 py-3 relative">
          <div class="flex flex-column">
            <!-- company img -->
            <div class="flex gap-3 mb-2 flex-column md:flex-row">
              <img
                src="{{ companyPhotoId | urlAdmin }}"
                alt="company"
                class="w-15rem h-10rem"
                style="object-fit: cover"
              />
              <div class="flex flex-column w-full">
                <!-- company name -->
                <h1>{{ companyName }}</h1>
                <!-- company desc -->

                <h3>Company Description</h3>
                <p>
                  {{ companyDesc }}
                </p>
              </div>
            </div>
            <p-divider></p-divider>
            <!-- job title -->
            <p>Open for you:</p>
            <h2>{{ vacancyTitle }}</h2>

            <div>
              <h4>Details:</h4>
              <div class="flex flex-column gap-2">
                <!-- Degree -->
                <div class="flex">
                  <span class="w-10rem">
                    <i class="pi pi-user"></i>
                    Degree
                  </span>
                  <span>: {{ degreeName }}</span>
                </div>

                <!-- Gender -->
                <div class="flex">
                  <span class="w-10rem">
                    <i class="pi pi-question"></i>
                    Gender
                  </span>
                  <span>: {{ genderName }}</span>
                </div>

                <!-- Ages -->
                <div class="flex">
                  <span class="w-10rem">
                    <i class="pi pi-id-card"></i>
                    Ages
                  </span>
                  <span>: {{ ageVacancyName }}</span>
                </div>

                <!-- Job Type -->
                <div class="flex">
                  <span class="w-10rem">
                    <i class="pi pi-briefcase"></i>
                    Job Type
                  </span>
                  <span>: {{ jobTypeName }}</span>
                </div>

                <!-- Payload -->
                <div class="flex">
                  <span class="w-10rem">
                    <i class="pi pi-money-bill"></i>
                    Payload
                  </span>
                  <span>: {{ convertedSalary }}</span>
                </div>

                <!-- Map -->
                <div class="flex">
                  <span class="w-10rem">
                    <i class="pi pi-map-marker"></i>
                    Location
                  </span>
                  <span> : {{ cityName }} </span>
                </div>
              </div>
            </div>

            <p-divider></p-divider>
            <!-- job desc -->
            <div>
              <h4>Description</h4>
              <div [innerHTML]="description"></div>
            </div>

            <p-divider></p-divider>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [UrlPipeAdmin, SharedModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class JobPreviewComponent implements OnInit {
  @Input() companyName = '';
  @Input() companyDesc = '';
  @Input() vacancyTitle = '';
  @Input() companyPhotoId = '';
  @Input() degreeName = '';
  @Input() genderName = '';
  @Input() ageVacancyName = '';
  @Input() jobTypeName = '';
  @Input() salary = '';
  @Input() cityName = '';
  @Input() description = '';

  convertedSalary = '';

  ngOnInit(): void {
    if (this.salary != '') {
      this.convertedSalary = Number(this.salary).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    }
  }
}
