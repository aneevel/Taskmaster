import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DailyComponent } from "./daily/daily.component";
import { WeeklyComponent } from "./weekly/weekly.component";
import { MonthlyComponent } from "./monthly/monthly.component";
import { OneOffComponent } from "./one-off/one-off.component";
import { AccountComponent } from "./account/account.component";
import { UsersComponent } from "./user/users/users.component";
import { LoginComponent } from "./login/login.component";
import { authGuard } from "./guards/auth.guard";

const routeConfig: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home page",
  },
  {
    path: 'callback',
    loadComponent: () => import('./features/callback/callback.component').then(mod => mod.CallbackComponent)
  },
  {
    path: "daily",
    component: DailyComponent,
    title: "Daily Tasks",
    canActivate: [authGuard]
  },
  {
    path: "weekly",
    component: WeeklyComponent,
    title: "Weekly Tasks",
    canActivate: [authGuard]
  },
  {
    path: "monthly",
    component: MonthlyComponent,
    title: "Monthly Tasks",
    canActivate: [authGuard]
  },
  {
    path: "one-off",
    component: OneOffComponent,
    title: "One-Off Tasks",
    canActivate: [authGuard]
  },
  {
    path: "account",
    component: AccountComponent,
    title: "Account Overview",
    canActivate: [authGuard]
  },
  { 
    path: "login",
    component: LoginComponent,
    title: "Login",
  },

  {
    path: 'users',
    component: UsersComponent,
    title: "Users Overview"
  }

];

export default routeConfig;
