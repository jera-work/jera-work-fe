import { Component, OnInit } from "@angular/core";
import { JobVacancyResDto } from "@dto/job-vacancy/job-vacancy.res.dto";
import { JobVacancyService } from "@services/job-vacancy.service";
import { Table } from "primeng/table";

@Component({
    selector : 'job-vacancy-list',
    templateUrl : './job-vacancy-list.component.html'
})
export class JobVacancyListComponent implements OnInit{

    visible = false

    jobVacancies : JobVacancyResDto[] = []
    jobVacancy? : JobVacancyResDto

    constructor(private jobVacancyService: JobVacancyService) {} 

    ngOnInit(): void {
    //     this.loading = false;
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'Open':
                return 'success';
            case 'Close':
                return 'danger';
            default: 
                return 'danger'
        }
    }

}