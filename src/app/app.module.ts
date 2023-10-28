import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { TokenInterceptor } from './services/tokeninterceptor';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuControllerComponent } from './components/menu-controller/menu-controller.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { EventMenuComponent } from './components/event-menu/event-menu.component';
import { EventCreationComponent } from './components/event-creation/event-creation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, MenuControllerComponent, ProfileMenuComponent, EventCreationComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  exports: [MenuControllerComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
