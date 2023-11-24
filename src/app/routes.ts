import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { DailyComponent } from './daily/daily.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page'
    },
    {
      path: 'daily',
      component: DailyComponent,
      title: 'Daily Tasks'
    }
]

export default routeConfig;