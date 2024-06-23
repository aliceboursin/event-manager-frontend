import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { EventListComponent } from './components/event-list/event-list.component';
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {EventCreationComponent} from "./components/event-creation/event-creation.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'events', component: EventListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'events/creation', component: EventCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
