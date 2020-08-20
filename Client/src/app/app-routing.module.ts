import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: '', loadChildren: './pages/default/default.module#DefaultPageModule' },
  { path: 'check', loadChildren: './pages/check/check.module#CheckPageModule' },
  { path: 'class-schedule', loadChildren: './pages/class-schedule/class-schedule.module#ClassSchedulePageModule' },
  { path: 'exam-schedule', loadChildren: './pages/exam-schedule/exam-schedule.module#ExamSchedulePageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
