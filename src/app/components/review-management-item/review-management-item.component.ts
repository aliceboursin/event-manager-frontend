import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../../data/review';

@Component({
  selector: 'app-review-management-item',
  templateUrl: './review-management-item.component.html',
  styleUrls: ['./review-management-item.component.css']
})
export class ReviewManagementItemComponent {
  @Input() review!: Review;
  @Output() deleteReview = new EventEmitter<string>();
  @Output() editReview = new EventEmitter<Review>();

  showOptions: boolean = false;

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  onDelete(): void {
    this.deleteReview.emit(this.review.id);
  }

  onEdit(): void {
    this.editReview.emit(this.review);
  }
}
