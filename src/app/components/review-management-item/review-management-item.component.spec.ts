import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewManagementItemComponent } from './review-management-item.component';

describe('ReviewManagementItemComponent', () => {
  let component: ReviewManagementItemComponent;
  let fixture: ComponentFixture<ReviewManagementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewManagementItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewManagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
