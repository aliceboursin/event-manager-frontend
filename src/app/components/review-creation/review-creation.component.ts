import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Location } from '@angular/common'
import {ActivatedRoute, Router} from '@angular/router';

import { EventService } from '../../services/event.service';
import Swal from 'sweetalert2';
import { SessionStorageService } from "../../services/session.storage.service";
import {CreateReviewRequest} from "../../data/review";

@Component({
  selector: 'app-review-creation',
  templateUrl: './review-creation.component.html',
  styleUrl: './review-creation.component.css',
})
export class ReviewCreationComponent implements OnInit {

  eventForm!: FormGroup;

  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Get all the categories to populate the dropdown list
    // Create the form group with the desired validations
    this.eventForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(2500)]],
      grade: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.eventForm.valid) {
      let ownerUser = sessionStorage.getItem("userId")!;
      let eventId = this.route.snapshot.paramMap.get('id');
      console.log(eventId);
      if (eventId) {
        // The form is valid,
        // Prepare the post creation object to be sent to the backend
        const newReview: CreateReviewRequest = {
          eventId: eventId,
          userId: ownerUser,
          comment: this.eventForm.value.comment,
          grade: this.eventForm.value.grade,
        };
        console.log(newReview);
        // Send the post instance to the backend and subscribe to the response
        // in order to close the modal
        this.eventService.createReview(eventId, newReview).subscribe((res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }

          });
          Toast.fire({
            icon: "success",
            title: "Post Submitted Successfully"
          });
          this.goToHomePage();
        });
      }} else {
        // Show an error toast when the form is not valid
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Please review your review"
        });
    }
  }

  goToHomePage() {
    this.location.back();
  }

  public get comment(): AbstractControl | null {
    return this.eventForm.get('comment');
  }

  public get grade(): AbstractControl | null {
    return this.eventForm.get('grade');
  }

}
