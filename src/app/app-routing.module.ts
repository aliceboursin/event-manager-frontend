import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { UserComponent } from './components/user/user.component';
import {CategoryListComponent} from "./components/category-list/category-list.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: UserComponent },
  { path: 'events', component: EventListComponent },
  { path: 'categories', component: CategoryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
