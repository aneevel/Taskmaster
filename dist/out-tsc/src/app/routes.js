import { HomeComponent } from "./home/home.component";
import { DailyComponent } from "./daily/daily.component";
import { WeeklyComponent } from "./weekly/weekly.component";
import { MonthlyComponent } from "./monthly/monthly.component";
import { OneOffComponent } from "./one-off/one-off.component";
import { AccountComponent } from "./account/account.component";
import { UsersComponent } from "./user/users/users.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { authGuard } from "./guards/auth.guard";
const routeConfig = [
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
        path: "tasks/daily",
        component: DailyComponent,
        title: "Daily Tasks",
        canActivate: [authGuard]
    },
    {
        path: "tasks/weekly",
        component: WeeklyComponent,
        title: "Weekly Tasks",
        canActivate: [authGuard]
    },
    {
        path: "tasks/monthly",
        component: MonthlyComponent,
        title: "Monthly Tasks",
        canActivate: [authGuard]
    },
    {
        path: "tasks/one-off",
        component: OneOffComponent,
        title: "One-Off Tasks",
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
        path: "signup",
        component: RegisterComponent,
    },
    {
        path: 'users',
        component: UsersComponent,
        title: "Users Overview"
    }
];
export default routeConfig;
//# sourceMappingURL=routes.js.map