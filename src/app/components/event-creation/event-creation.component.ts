import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Location } from '@angular/common'
import { Router } from '@angular/router';

import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import {CreateEventRequest} from '../../data/event';
import { EventService } from '../../services/event.service';
import Swal from 'sweetalert2';
import { SessionStorageService } from "../../services/session.storage.service";
import {catchError, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrl: './event-creation.component.css',
})
export class EventCreationComponent implements OnInit {

  eventForm!: FormGroup;
  categories$: Observable<Category[]> | null = null;

  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private eventService: EventService,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Get all the categories to populate the dropdown list
    this.loadCategories();
    // Create the form group with the desired validations
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(2500)]],
      category: ['', [Validators.required]],
    });
  }

  loadCategories(): void {
    this.categories$ = this.categoryService.getAll()
      .pipe(
        catchError((error:HttpResponse<any>) => {
          console.log(error);
          return of([])
        })
      );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.eventForm.valid) {
      let ownerUser = sessionStorage.getItem("userId")!;
    // The form is valid,
    // Prepare the post creation object to be sent to the backend
      const newEvent: CreateEventRequest = {
        title: this.eventForm.value.title,
        city: this.eventForm.value.city,
        address: this.eventForm.value.address,
        date: this.eventForm.value.date,
        time: this.eventForm.value.time,
        description: this.eventForm.value.description,
        category: this.eventForm.value.category,
        owner: ownerUser,
      };
      // Send the post instance to the backend and subscribe to the response
      // in order to close the modal
      this.eventService.create(newEvent).subscribe((res) => {
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
    } else {
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
        title: "Please review your post"
      });
    }
  }

  goToHomePage() {
    this.location.back();
  }

  public get title(): AbstractControl | null {
    return this.eventForm.get('title');
  }

  public get city(): AbstractControl | null {
    return this.eventForm.get('city');
  }

  public get address(): AbstractControl | null {
    return this.eventForm.get('address');
  }

  public get date(): AbstractControl | null {
    return this.eventForm.get('date');
  }

  public get time(): AbstractControl | null {
    return this.eventForm.get('time');
  }

  public get description(): AbstractControl | null {
    return this.eventForm.get('description');
  }

  public get category(): AbstractControl | null {
    return this.eventForm.get('category');
  }

  public get owner(): AbstractControl | null {
    return this.eventForm.get('owner');
  }

}
