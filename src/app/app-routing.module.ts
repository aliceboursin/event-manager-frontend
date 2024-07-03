import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { UserComponent } from './components/user/user.component';
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {EventCreationComponent} from "./components/event-creation/event-creation.component";
import {EventPageComponent} from "./components/event-page/event-page.component";
import { SearchPageComponent } from './components/search/search-page.component';
import { CityListComponent } from './components/city-list/city-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: UserComponent },
  { path: 'search', component: SearchPageComponent },
  {
    path: 'events',
    children: [
      {
        path: '',
        component: EventListComponent
      },
      {
        path: 'creation',
        component: EventCreationComponent
      },
      {
        path: 'passed-events',
        component: EventListComponent
      },
      {
        path: 'upcoming-events',
        component: EventListComponent
      },
      {
        path: ':id',
        component: EventPageComponent
      },
      {
        path: 'my-events',
        children: [
          {
            path: 'created-events',
            component: EventListComponent
          },
          {
            path: 'upcoming-events',
            component: EventListComponent
          },
          {
            path: 'past-events',
            component: EventListComponent
          }
        ]
      }
    ]
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        component: CategoryListComponent
      },
      {
        path: ':category',
        component: EventListComponent
      },
    ]
  },
  {
    path: 'cities',
    children: [
      {
        path: '',
        component: CityListComponent
      },
      {
        path: ':city',
        component: EventListComponent
      },
    ]
  },
  // { path: 'categories', component: CategoryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
