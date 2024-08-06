import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DailyComponent } from "./daily/daily.component";
import { WeeklyComponent } from "./weekly/weekly.component";
import { MonthlyComponent } from "./monthly/monthly.component";
import { OneOffComponent } from "./one-off/one-off.component";
import { AccountComponent } from "./account/account.component";
import { UsersComponent } from "./user/users/users.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";

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
    canActivate: [AuthGuard]
  },
  {
    path: "weekly",
    component: WeeklyComponent,
    title: "Weekly Tasks",
    canActivate: [AuthGuard]
  },
  {
    path: "monthly",
    component: MonthlyComponent,
    title: "Monthly Tasks",
    canActivate: [AuthGuard]
  },
  {
    path: "one-off",
    component: OneOffComponent,
    title: "One-Off Tasks",
    canActivate: [AuthGuard]
  },
  {
    path: "account",
    component: AccountComponent,
    title: "Account Overview",
    canActivate: [AuthGuard]
  },
  { 
    path: "login",
    component: LoginComponent,
    title: "Login",
  },
  {
    path: 'users',
    component: UsersComponent,
    // TODO: AdminGuard?
    canActivate: [AuthGuard]
  }

];

export default routeConfig;
