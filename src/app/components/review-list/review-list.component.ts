import {Component, OnInit} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {Review} from "../../data/review";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {HttpResponse} from "@angular/common/http";
import {SessionStorageService} from "../../services/session.storage.service";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent implements OnInit {
  reviews$: Observable<Review[]> | null = null;
  reviews: Review[] = [];
  userId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService : UserService,
    private eventService : EventService,
    private sesssionStorageService : SessionStorageService,
  ){}


  ngOnInit(): void {
    if (this.router.url === '/account') {
      this.userId = this.sesssionStorageService.getItem('userId');
      if (this.userId) {
        this.getAllReviewsForUser(this.userId);
      }
    }
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      this.getAllReviewsForEvent(this.route.snapshot.params['id']);
    }
  }

  getAllReviewsForUser(userId: string) {
    this.reviews$ = this.userService.getAllUserReviews(userId)
        .pipe(
            catchError((error:HttpResponse<any>) => {
              console.log(error);
              return of([])
            })
        );
  }

  getAllReviewsForEvent(eventId: string): void {
    this.reviews$ = this.eventService.getAllEventReviews(eventId)
        .pipe(
            catchError((error:HttpResponse<any>) => {
              console.log(error);
              return of([])
            })
        );
   /* this.eventService.getAllEventReviews(eventId).subscribe(reviews => {
      this.reviews = reviews;
      console.log(reviews);
    });*/



  }
}
