import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventMenuComponent } from './event-menu.component';

const routes: Routes = [
  {
    path: '',
    component: EventMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventMenuRoutingModule {}
