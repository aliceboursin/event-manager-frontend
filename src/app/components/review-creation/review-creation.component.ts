import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import Swal from 'sweetalert2';
import { SessionStorageService } from '../../services/session.storage.service';
import { CreateReviewRequest } from '../../data/review';

@Component({
  selector: 'app-review-creation',
  templateUrl: './review-creation.component.html',
  styleUrls: ['./review-creation.component.css'],
})
export class ReviewCreationComponent implements OnInit {
  @Input() eventId!: string;
  @Output() reviewSubmitted = new EventEmitter<void>();
  eventForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(2500)]],
      grade: [0, [Validators.required]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.eventForm.valid) {
      const ownerUser = this.sessionStorage.getItem('userId')!;
      const eventId = this.route.snapshot.paramMap.get('id');
      if (eventId) {
        const newReview: CreateReviewRequest = {
          eventId: eventId,
          userId: ownerUser,
          comment: this.eventForm.value.comment,
          grade: this.eventForm.value.grade,
        };
        this.eventService.createReview(eventId, newReview).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Review Submitted Successfully',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          
        });
        this.reviewSubmitted.emit();
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please review your review',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  }



  get comment(): AbstractControl | null {
    return this.eventForm.get('comment');
  }

  get grade(): AbstractControl | null {
    return this.eventForm.get('grade');
  }

  close(){
    this.reviewSubmitted.emit();
    console.log("close");
  }
}
