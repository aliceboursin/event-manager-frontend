import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../data/review';
import { SessionStorageService } from '../../services/session.storage.service';

@Component({
  selector: 'app-review-management',
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.css']
})
export class ReviewManagementComponent implements OnInit {

  constructor(private reviewService: ReviewService,private sessionStorageService: SessionStorageService) {
    this.id = this.sessionStorageService.getItem('userId') || "";
  }


  reviews: Review[] = [];
  sortField: string = '';
  sortOrder: number = 1;
  sortOptions: any[] = [];
  id: string = "";
  showOptions: boolean = false;



  ngOnInit(): void {
    this.loadReviews();
    this.sortOptions = [
      { label: 'Title', value: 'event.title' },
      { label: 'Date', value: 'event.date' }
    ];
  }

  loadReviews(): void {
    // Replace with your service call to get reviews for the logged-in user
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

  onEdit(review: Review): void {
    // Handle edit action
  }

  editReview(review: Review): void {
    // Logic to edit the review
  }

  getFilledStars(count: number): number[] {
    return Array(count).fill(0);
}

// Fonction pour générer les étoiles vides (5 - grade)
getEmptyStars(count: number): number[] {
    return Array(5 - count).fill(0);
}
}
