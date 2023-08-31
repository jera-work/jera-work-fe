import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TimeAgoPipe } from '@pipes/timeago.pipe';
import { UrlPipeAdmin } from '@pipes/url.pipe';
import { SharedModule } from '@shared/shared.module';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'job-preview',
    template: `
  <div class="jobpreview">
  <div class="min-h-screen md:mx-8 sm:mx-6 mx-2">
    <div class="px-6 shadow-3 py-2 relative">
      <div class="flex flex-column">
        <!-- company img -->
        <div class="flex gap-2 justify-content-end my-3">
          <i class="pi pi-download text-2xl cursor-pointer"></i>
        </div>
        <div class="flex gap-3 mb-2 flex-column md:flex-row">
          <img src="{{ companyPhotoId | urlAdmin }}" alt="company" class="w-15rem h-10rem"
            style="object-fit: cover" />
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
              <span>: {{ salary }}</span>
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
    encapsulation: ViewEncapsulation.None
})
export class JobPreviewComponent {
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
}
