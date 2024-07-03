import { Component, OnInit } from "@angular/core";
import { Category } from "../../data/category";
import { CategoryService } from "../../services/category.service";
import {catchError, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-category-list',
    templateUrl:'./category-list.component.html',
    styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
    categories$: Observable<Category[]> | null = null;

    constructor(
      private categoryService: CategoryService,
      ) {}

    ngOnInit(): void {
        this.loadCategories();
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

}
