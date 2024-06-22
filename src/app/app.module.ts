import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import {HttpClientModule } from '@angular/common/http';
import { SessionStorageService } from './services/session.storage.service';
import { SignUpComponent } from './components/signup/signup.component';
import { EventService } from './services/event.service';
import { EventListComponent } from './components/event-list/event-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';
import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';
import {TopBarUnloggedComponent } from './components/top-bar-unlogged/top-bar.component-unlogged';
import {TopBarLoggedComponent } from './components/top-bar-logged/top-bar.component-logged';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import {CategoryService} from "./services/category.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    EventListComponent,
    CategoryListComponent,
    EventListItemComponent,
    CategoryListItemComponent,
    TopBarUnloggedComponent,
    TopBarLoggedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    AuthService,
    SessionStorageService,
    EventService,
    CategoryService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
