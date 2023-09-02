import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeAgoPipe } from '@pipes/timeago.pipe';
import { UrlPipeAdmin } from '@pipes/url.pipe';
import { SharedModule } from '@shared/shared.module';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'job-card',
  template: `
    <div (click)="clickBtn()">
      <p-card
        class="w-full relative cursor-pointer"
        styleClass="hover:shadow-4 h-17rem"
      >
        <span class="absolute top-0 right-0 mr-3 mt-3">
          <i class="pi pi-clock"></i>
          {{ time | timeAgo }}
        </span>
        <div class="flex flex-row ">
          <div class="align-content-center mr-4">
            <img
              src="{{ companyImg | urlAdmin }}"
              class="w-10rem sm:w-13rem "
              alt="company"
            />
          </div>
          <div class="flex flex-column w-6 flex-1">
            <!-- Job Vacancy Title -->
            <div class="flex flex-column row-gap-2 mb-1">
              <span class="text-2xl font-bold">{{ title }}</span>
              <div>
                <span class="font-semibold">
                  <i class="pi pi-building"> </i>
                  {{ company }}
                </span>
              </div>
              <div>
                <span class="font-medium">
                  <i class="pi pi-money-bill"></i>
                  {{ convertedSalary }}
                </span>
              </div>
            </div>
            <p-divider [style]="{ color: 'black' }"></p-divider>

            <!-- Job Vacancy Detail -->
            <div class="flex column-gap-2 md:column-gap-5 flex-wrap">
              <span>
                <i class="pi pi-user"></i>
                {{ degree }}
              </span>
              <span>
                <i class="pi pi-briefcase"></i>
                {{ jobType }}
              </span>
              <span>
                <i class="pi pi-map-marker"></i>
                {{ location }}
              </span>
            </div>
          </div>
        </div>
      </p-card>
    </div>
  `,
  imports: [CardModule, UrlPipeAdmin, TimeAgoPipe, SharedModule],
  standalone: true,
})
export class JobCardComponent implements OnInit {
  @Input() time = '';
  @Input() title = '';
  @Input() company = '';
  @Input() companyImg = '';
  @Input() salary = '';
  @Input() degree = '';
  @Input() jobType = '';
  @Input() location = '';

  convertedSalary = '';

  ngOnInit(): void {
    if (this.salary != '') {
      this.convertedSalary = Number(this.salary).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    }
  }

  @Output() clickChange = new EventEmitter<void>();

  clickBtn() {
    this.clickChange.emit();
  }
}
