import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { EventService } from '../../services/event.service';
import { Category } from '../../data/category';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Output() filtersApplied = new EventEmitter<{ category: string | null, city: string | null, date: Date | null, showFriendEvents: boolean }>();

  selectedCategory: string | null = null;
  selectedCity: string | null = null;
  selectedDate: Date | null = null;
  showFriendEvents: boolean = false;

  categories: Category[] = [];
  cities: string[] = [];

  constructor(private categoryService: CategoryService, private eventService: EventService) {}

  applyFilters() {
    this.filtersApplied.emit({
      category: this.selectedCategory,
      city: this.selectedCity,
      date: this.selectedDate,
      showFriendEvents: this.showFriendEvents
    });
  }

  resetFilters(): void {
    this.selectedCategory = null;
    this.selectedCity = null;
    this.selectedDate = null;
    this.showFriendEvents = false;
    this.applyFilters();
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
    this.eventService.getAllCities().subscribe((cities: string[]) => {
      this.cities = cities;
    });
  }
}
