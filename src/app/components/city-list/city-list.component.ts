import { Component, OnInit } from "@angular/core";
import { EventService } from "../../services/event.service";
import {catchError, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import { SessionStorageService } from "../../services/session.storage.service";
import { ToastService } from "../../services/toast.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-city-list',
    templateUrl:'./city-list.component.html',
    styleUrls: ['./city-list.component.css']
})

export class CityListComponent implements OnInit {
    cities$: Observable<string[]> | null = null;

    constructor(
      private eventService: EventService,
      private sessionStorageService : SessionStorageService,
      private toastService : ToastService,
      private router : Router
      ) {}

  
    ngOnInit(): void {
      const userId = this.sessionStorageService.getItem('userId');
      if(userId){
        this.loadCities();
      }
      else{
        this.toastService.showToast("Please log in", "error");
        this.router.navigate(['/']);
      } 
    }

    loadCities(): void {
      this.cities$ = this.eventService.getAllCities()
        .pipe(
          catchError((error:HttpResponse<any>) => {
            console.log(error);
            return of([])
          })
        );
    }

}
