import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../data/category';
import { EventService } from '../../services/event.service';

declare var $: any;

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Output() filtersApplied = new EventEmitter<{ category: string | null, city: string | null, date: Date | null }>();

  
  constructor(private categoryService: CategoryService, private eventService :EventService) {}


  selectedCategory: string| null = null;
  selectedCity: string | null = null;
  selectedDate: string | null = null; 

  categories: Category[] = [];
  cities: string[] = [];

  applyFilters() {
    const date = this.selectedDate ? new Date(this.selectedDate.split('/').reverse().join('/')) : null;

    this.filtersApplied.emit({
      category: this.selectedCategory,
      city: this.selectedCity,
      date: date
    });
    
  }

  openDatePicker(): void {
    $('#datepicker').datepicker('show');
  }


  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
    this.eventService.getAllCities().subscribe((cities: string[]) => {
      this.cities = cities;
    });
    $('#datepicker').datepicker({
      format: 'dd/mm/yyyy', // Format de date souhaité
      autoclose: true,
      todayHighlight: true
    }).on('changeDate', (e: any) => {
      // Mise à jour de la date sélectionnée dans le format souhaité
      this.selectedDate = `${e.date.getDate()}/${e.date.getMonth() + 1}/${e.date.getFullYear()}`;
    });
  }

  resetFilters(): void {
    this.selectedCategory = null;
    this.selectedCity = null;
    this.selectedDate = null;
    this.applyFilters(); 
  }




  
}
