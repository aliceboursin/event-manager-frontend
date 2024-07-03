import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../data/review';
import { SessionStorageService } from '../../services/session.storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-review-management',
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.css']
})
export class ReviewManagementComponent implements OnInit {

  constructor(
    private reviewService: ReviewService,
    private sessionStorageService: SessionStorageService,
    private router : Router,  
    private toastService : ToastService,
  ) {
    this.id = this.sessionStorageService.getItem('userId') || "";
  }
 


  ngOnInit(): void {
    const userId = this.sessionStorageService.getItem('userId');
    if(userId){
      this.loadReviews();
    this.sortOptions = [
      { label: 'Title', value: 'event.title' },
      { label: 'Date', value: 'event.date' }
    ];
    }
    else{
      this.toastService.showToast("Please log in", "error");
      this.router.navigate(['/']);
    } 
  }


  reviews: Review[] = [];
  sortField: string = '';
  sortOrder: number = 1;
  sortOptions: any[] = [];
  id: string = "";
  showOptions: boolean = false;



  loadReviews(): void {
    this.reviewService.getUserReviews(this.id).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  onSortChange(event: any): void {
    const value = event.value;

    if (value.startsWith('!')) {
      this.sortOrder = -1;
      this.sortField = value.substring(1);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDelete(review: Review): void {
    this.reviewService.deleteReview(review.id).subscribe(() => {
      this.loadReviews();
    });
  }

  toggleOptions(review: Review): void {
    this.showOptions = !this.showOptions;
  }

 

  getFilledStars(count: number): number[] {
    return Array(count).fill(0);
}


  getEmptyStars(count: number): number[] {
    return Array(5 - count).fill(0);
  }
}
