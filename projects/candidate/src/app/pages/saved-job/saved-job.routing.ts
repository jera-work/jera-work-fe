import { Routes } from '@angular/router';
import { SavedJobListComponent } from './saved-list/saved-job-list.component';
import { SavedJobDetailsComponent } from './saved-details/saved-job-details.component';

const routes: Routes = [
  {
    path: '',
    component: SavedJobListComponent,
  },
  {
    path: ':id',
    component: SavedJobDetailsComponent,
  },
];
