import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import {HttpClientModule } from '@angular/common/http';
import { SessionStorageService } from './services/session.storage.service';
import { SignUpComponent } from './components/signup/signup.component';
import { EventService } from './services/event.service';
import { EventListComponent } from './components/event-list/event-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';
import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';
import { CityListItemComponent } from './components/city-list-item/city-list-item.component';
import {TopBarUnloggedComponent } from './components/top-bar-unlogged/top-bar.component-unlogged';
import {TopBarLoggedComponent } from './components/top-bar-logged/top-bar.component-logged';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserComponent } from './components/user/user.component';
import {CategoryService} from "./services/category.service";
import { FriendShipService } from './services/friendship.service';
import { UserService } from './services/user.service';
import { AddFriendPopupComponent } from './components/add-friend-popup/add-friend-popup.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { EventCreationComponent } from './components/event-creation/event-creation.component';
import { ReviewCreationComponent } from './components/review-creation/review-creation.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { SearchPageComponent } from './components/search/search-page.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    EventListComponent,
    CategoryListComponent,
    CityListComponent,
    EventListItemComponent,
    CategoryListItemComponent,
    CityListItemComponent,
    TopBarUnloggedComponent,
    TopBarLoggedComponent,
    EventCreationComponent,
    ReviewCreationComponent,
    UserComponent,
    TopBarLoggedComponent,
    AddFriendPopupComponent,
    EventPageComponent,
    SearchPageComponent,
    FilterBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    RatingModule,
  ],
  providers: [
    AuthService,
    SessionStorageService,
    EventService,
    CategoryService,
    provideAnimationsAsync(),
    FriendShipService,
    UserService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
