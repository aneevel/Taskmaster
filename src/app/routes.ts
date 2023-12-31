import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DailyComponent } from "./daily/daily.component";
import { WeeklyComponent } from "./weekly/weekly.component";
import { MonthlyComponent } from "./monthly/monthly.component";
import { OneOffComponent } from "./one-off/one-off.component";
import { AccountComponent } from "./account/account.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegisterComponent } from "./register/register.component";

const routeConfig: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home page",
  },
  {
    path: "daily",
    component: DailyComponent,
    title: "Daily Tasks",
  },
  {
    path: "weekly",
    component: WeeklyComponent,
    title: "Weekly Tasks",
  },
  {
    path: "monthly",
    component: MonthlyComponent,
    title: "Monthly Tasks",
  },
  {
    path: "one-off",
    component: OneOffComponent,
    title: "One-Off Tasks",
  },
  {
    path: "account",
    component: AccountComponent,
    title: "Account Overview",
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Login",
  },
  {
    path: "logout",
    component: LogoutComponent,
    title: "Logout",
  },
  {
    path: "register",
    component: RegisterComponent,
    title: "Register an Account",
  },
];

export default routeConfig;
