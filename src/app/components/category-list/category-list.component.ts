import { Component, OnInit } from "@angular/core";
import { Category } from "../../data/category";
import { CategoryService } from "../../services/category.service";
import {catchError, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import { SessionStorageService } from "../../services/session.storage.service";
import { ToastService } from "../../services/toast.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-category-list',
    templateUrl:'./category-list.component.html',
    styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
    categories$: Observable<Category[]> | null = null;

    constructor(
      private categoryService: CategoryService,
      private sessionStorageService : SessionStorageService,
      private toastService : ToastService,
      private router : Router
      ) {}

   

  
    ngOnInit(): void {
      const userId = this.sessionStorageService.getItem('userId');
      if(userId){
        this.loadCategories();
      }
      else{
        this.toastService.showToast("Please log in", "error");
        this.router.navigate(['/']);
      } 
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
