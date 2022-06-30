import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { HomeComponent } from './home/home.component';
import { MoviedetailComponent } from './moviedetail/moviedetail.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-reset', component: PasswordresetComponent },
  { path: 'movie-detail/:id', component: MoviedetailComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
