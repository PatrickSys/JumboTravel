import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AssistantComponent } from '../dashboard/components/assistant/assistant.component';
import { OrdersComponent } from "../page/containers/components/orders/orders.component";
import { HomeComponent } from '../page/containers/components/home/home.component';
import { RestockerComponent } from '../dashboard/components/restocker/restocker.component';

const routes: Routes =  [
  { path: 'assistant', component: AssistantComponent},
  { path: 'orders', component: OrdersComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'restocker', component: RestockerComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
