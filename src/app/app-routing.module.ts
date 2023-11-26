import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/authguard';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { EventMenuComponent } from './components/event-menu/event-menu.component';
import { EventCreationComponent } from './components/event-creation/event-creation.component';
import { PurchaseTicketsComponent } from './components/purchase-tickets/purchase-tickets.component';
import { PaypalsuccessComponent } from './components/paypalsuccess/paypalsuccess.component';
import { PurchaseListComponent } from './components/purchase-list/purchase-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';


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
    path: 'purchase/success',
    component: PaypalsuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'purchase/:id',
    component: PurchaseTicketsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'purchases',
    component: PurchaseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event/details/:id',
    component: EventDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
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
