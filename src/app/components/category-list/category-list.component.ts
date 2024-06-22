import { Component, OnInit } from "@angular/core";
import { Category } from "../../data/category";
import { CategoryService } from "../../services/category.service";

@Component({
    selector: 'app-category-list',
    templateUrl:'./category-list.component.html',
    styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
    categories: Category[] = [];

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.loadCategories();
    }


    loadCategories(): void {
      this.categoryService.getAll().subscribe((categories) => { this.categories = categories;},      error => {
        console.error('Error fetching categories', error);
      });
    }

}
