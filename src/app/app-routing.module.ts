import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SingleBarChartComponent } from './single-bar-chart/single-bar-chart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'details/:id', component:SingleBarChartComponent },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
