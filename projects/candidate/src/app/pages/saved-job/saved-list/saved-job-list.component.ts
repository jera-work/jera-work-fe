import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SavedJobResDto } from '@dto/saved-vacancy/saved-vacancy-res.dto';
import { SavedVacancyService } from '@services/saved-vacancy.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'saved-job-list',
  templateUrl: './saved-job-list.component.html',
})
export class SavedJobListComponent implements OnInit {

  savedVacanciesWithLimit: SavedJobResDto[] = []
  savedVacancies: SavedJobResDto[] = []
  first: number = 0;
  rowCounts: number = 3;
  length!: number;

  constructor(private title: Title,
    private router: Router,
    private savedVacancyService: SavedVacancyService) {}

  ngOnInit(): void {
    this.title.setTitle('Saved Jobs');
    this.getSavedVacancies()
    this.getSavedVacanciesWithLimit(this.first, this.rowCounts)
  }

  toDetail(jobId: string) {
    this.router.navigateByUrl(`/job/${jobId}`);
  }

  getSavedVacanciesWithLimit(startIndex: number, endIndex: number){
    firstValueFrom(this.savedVacancyService.getMySavedJobWithLimit(startIndex, endIndex))
      .then(res => {
        this.savedVacanciesWithLimit = res
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getSavedVacancies(){
    firstValueFrom(this.savedVacancyService.getMySavedJobs())
      .then(res => {
        this.savedVacancies = res
        this.length = res.length
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onPageChange(event: any) {
    this.getSavedVacanciesWithLimit(event.first, event.first + event.rows);
  }
}
