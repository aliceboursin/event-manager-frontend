import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from "../../services/event.service";
import { Event } from "../../data/event";
import {catchError, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {SessionStorageService} from "../../services/session.storage.service";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event$: Observable<Event> | null = null;
  participants$: Observable<number> | null = null;
  currentUser: string | null = null;
  isParticipating: boolean = false;
  showReviewForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private eventService: EventService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.currentUser = sessionStorage.getItem("userId");
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
            });
          }
        }
      });
  }

  handleDeleteButton(id: string) {
    if (!id) {
      console.error('ID is null or undefined');
      this.toastService.showToast("Failed to delete this eent", "error");
      return;
    }

    this.eventService.deleteById(id)
      .pipe(
        catchError((error: any) => {
          console.error('Error occurred during delete:', error);
          this.toastService.showToast("Failed to delete this eent", "error");
          return of();
        })
      )
      .subscribe(() => {
        this.toastService.showToast("Event deleted successfully", "success");
        this.router.navigate(['/events']);
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
    if (!this.currentUser) {
      console.log("no user logged")
    }else{
      if(!this.isParticipating){
        this.eventService.addParticipation(eventId, this.currentUser).subscribe(res => console.log(res));
    }
    else{
      this.eventService.deleteParticipation(eventId, this.currentUser).subscribe(res => console.log(res));
    }
    this.toggleParticipation();
    this.ngOnInit();
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
