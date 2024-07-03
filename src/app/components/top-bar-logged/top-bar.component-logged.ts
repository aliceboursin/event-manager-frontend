import { Component } from "@angular/core";
import {Router} from "@angular/router";
import { SessionStorageService } from "../../services/session.storage.service";

@Component({
    selector : 'app-top-bar-logged',
    templateUrl: './top-bar-logged.component.html',
    styleUrls: ['./top-bar-logged.component.css']

})
export class TopBarLoggedComponent{

  username: string = "";

  constructor(private router: Router, private sessionStorageService: SessionStorageService) {
    this.username = this.sessionStorageService.getItem('username') || "";
  }

  goToEvents() {
    this.router.navigate(['/events']);
  }

  goToEventsCreation() {
    this.router.navigate(['/events/creation']);
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }


  goToCities() {
    this.router.navigate(['/cities']);
  }


  goToMyAccount() {
    this.router.navigate(['/account']);
  }

  goToMyReviews() {
    this.router.navigate(['/my-reviews']);
  }

  goToMyEvents() {
    this.router.navigate(['/my-events']);
  }

  goToMyFriendsEvents() {
    this.router.navigate(['/my-friends-events']);
  }

  logout() {
    this.sessionStorageService.clear();
    this.router.navigate(['/']);
  }

  navigateToSearch(): void {
    this.router.navigate(['/search']);
  }
  goToPassedEvents() {
    this.router.navigate(['events/passed-events']);
  }


  goToUpcomingEvents() {
    this.router.navigate(['events/upcoming-events']);
  }

  goToMyUpcomingEvents(){
    this.router.navigate(['events/my-events/upcoming-events'])
  }

  goToMyCreatedEvents(){
    this.router.navigate(['events/my-events/created-events'])
  }

  goToMyPastEvents(){
    this.router.navigate(['events/my-events/past-events'])
  }

  get isAccountOrMyReviewsPage(): boolean {
    return (this.router.url === '/account')|| (this.router.url==='/my-reviews');
  }

  get navbarClass(): string {
    return this.isAccountOrMyReviewsPage ? 'account-page' : 'default-page';
  }
}
