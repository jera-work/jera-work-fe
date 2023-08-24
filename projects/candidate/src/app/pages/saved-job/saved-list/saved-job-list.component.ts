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

  savedVacancies: SavedJobResDto[] = []
  first: number = 0;
  rowCounts: number = 10;

  constructor(private title: Title,
    private router: Router,
    private savedVacancyService: SavedVacancyService) {}

  ngOnInit(): void {
    this.title.setTitle('Saved Jobs');
    this.getSavedVacancies()
  }

  toDetail(jobId: string) {
    this.router.navigateByUrl(`/job/${jobId}`);
  }

  getSavedVacancies(){
    firstValueFrom(this.savedVacancyService.getMySavedJobs(this.first, this.rowCounts))
      .then(res => {
        this.savedVacancies = res
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
