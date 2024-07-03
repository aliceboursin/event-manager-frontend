import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from "../../services/event.service";
import { Event } from "../../data/event";
import {catchError, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {SessionStorageService} from "../../services/session.storage.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event$: Observable<Event> | null = null;
  participants$: Observable<number> | null = null;
  ownerUser: string | null = null;
  isParticipating: boolean = false;
  showReviewForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private eventService: EventService,
    private sessionStorage: SessionStorageService,
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.getEvent(eventId);
      this.getCountParticipants(eventId);
    }
  }

  toggleParticipation(): void {
    this.isParticipating = !this.isParticipating;
  }

  getEvent(id: string): void {
    this.event$ = this.eventService.getById(id)
      .pipe(
        catchError((error:HttpResponse<any>) => {
          console.log(error);
          return of()
        })
      );
      this.event$.subscribe(event => {
        if (event) {
          const userId = this.sessionStorage.getItem("userId");
          if (userId) {
            this.eventService.isParticipating(event.id, userId).subscribe(isParticipating => {
              this.isParticipating = isParticipating;
              console.log("is partcipating : " + isParticipating);
            });
          }
        }
      });
  }

  getCountParticipants(id: string): void {
    this.participants$ = this.eventService.getCountParticipants(id)
      .pipe(
        catchError((error:HttpResponse<any>) => {
          console.log(error);
          return of()
        })
      );
  }

  handleParticipationButton(eventId: string): void {
    this.ownerUser = sessionStorage.getItem("userId");
    if (!this.ownerUser) {
      console.log("no user logged")
    }else{
      if(!this.isParticipating){
        this.eventService.addParticipation(eventId, this.ownerUser).subscribe(res => console.log(res));
    }
    else{
      this.eventService.deleteParticipation(eventId, this.ownerUser).subscribe(res => console.log(res));

    }
    this.getCountParticipants(eventId);

    this.toggleParticipation();
    }
  }

  isEventInPast(eventDate: Date): boolean {
    return new Date(eventDate) < new Date();
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
  }

  handleReviewSubmitted(): void {
    this.toggleReviewForm();
    this.reloadReviews();
  }

  reloadReviews(): void {
    const reviewListComponent = this.reviewListComponent;
    if (reviewListComponent) {
      reviewListComponent.reload();
    }
  }

  @ViewChild('reviewListComponent') reviewListComponent!: any;

}
