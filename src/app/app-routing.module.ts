import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/authguard';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { EventMenuComponent } from './components/event-menu/event-menu.component';
import { EventCreationComponent } from './components/event-creation/event-creation.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileMenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    loadChildren: () => import('./components/event-menu/event-menu.module').then( m => m.EventMenuModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'create-event',
    component: EventCreationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
