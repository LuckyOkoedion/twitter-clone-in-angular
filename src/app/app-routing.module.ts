import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: "langing", canActivate: [AuthGuard], component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // scrollPositionRestoration: 'enabled',
    // anchorScrolling: 'enabled',
    // scrollOffset: [0, 64]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
