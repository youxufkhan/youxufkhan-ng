import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProjectsPageComponent } from './projects/projects-page.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'projects', component: ProjectsPageComponent }
];
