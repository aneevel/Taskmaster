import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TasksComponent } from "./tasks/tasks.component";
import { AccountComponent } from "./account/account.component";
import { UsersComponent } from "./user/users/users.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
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
    path: "tasks",
    component: TasksComponent,
    title: "User Tasks",
    canActivate: [authGuard]
  },
  {
    path: "user/account",
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
    path: "register",
    component: RegisterComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    title: "Users Overview"
  }

];

export default routeConfig;
