import { Component } from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector : 'app-top-bar-logged',
    templateUrl: './top-bar-logged.component.html',
    styleUrls: ['./top-bar-logged.component.css']

})
export class TopBarLoggedComponent{

  constructor(private router: Router) { }

  goToEvents() {
    this.router.navigate(['/events']);
  }

  goToEventsCreation() {
    this.router.navigate(['/events/creation']);
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }

  goToAccount() {
    this.router.navigate(['/account']);
  }

}
