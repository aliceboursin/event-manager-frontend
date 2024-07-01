import { Component, OnInit } from "@angular/core";
import { Category } from "../../data/category";
import { EventService } from "../../services/event.service";
import {catchError, Observable, of, tap} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-city-list',
    templateUrl:'./city-list.component.html',
    styleUrls: ['./city-list.component.css']
})

export class CityListComponent implements OnInit {
    cities$: Observable<string[]> | null = null;

    constructor(
      private eventService: EventService,
      ) {}

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
      this.cities$ = this.eventService.getAllCities()
        .pipe(
          catchError((error:HttpResponse<any>) => {
            console.log(error);
            return of([])
          })
        );
    }

}
