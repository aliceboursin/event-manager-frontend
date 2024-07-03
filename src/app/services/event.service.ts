import { Injectable } from "@angular/core";
import { environment } from "../environment/environment.prod";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateEventRequest, UpdateEventRequest } from "../data/event";
import { Event } from "../data/event";
import {CreateReviewRequest, Review} from "../data/review";

@Injectable()
export class EventService {
  private eventUrl = environment.apiUrl + 'events';

  constructor(private http: HttpClient) {
  }


  getAll(title: string | null = null): Observable<Event[]> {
    let params = new HttpParams();
    if (title) {
      params = params.append('title', title);
    }
    return this.http.get<Event[]>(this.eventUrl, {params});
  }

  getById(id: string): Observable<Event> {
    const url = `${this.eventUrl}/${id}`;
    return this.http.get<Event>(url);
  }

  getByCategoryId(categoryId: string): Observable<Event[]> {
    const url = `${this.eventUrl}/category/${categoryId}`;
    return this.http.get<Event[]>(url);
  }

  create(event: CreateEventRequest): Observable<Event> {
    return this.http.post<Event>(this.eventUrl, event);
  }

  update(id: string, post: UpdateEventRequest): Observable<Event> {
    const url = `${this.eventUrl}/${id}`;
    return this.http.put<Event>(url, post);
  }

  deleteById(id: string): Observable<void> {
    const url = `${this.eventUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getCountParticipants(id: String) {
    const url = `${this.eventUrl}/${id}/count`;
    return this.http.get<number>(url);
  }

  addParticipation(eventId: string, userId: string): Observable<void> {
    const url = `${this.eventUrl}/${eventId}/participations/${userId}`;
    return this.http.post<void>(url, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  getPastEvents(): Observable<Event[]> {
    console.log("past events");
    const url = `${this.eventUrl}/past-events`;
    return this.http.get<Event[]>(url);
  }

  getUpcomingEvents(): Observable<Event[]> {
    console.log("upcoming events");
    const url = `${this.eventUrl}/upcoming-events`;
    return this.http.get<Event[]>(url);
  }

  search(query: string): Observable<Event[]> {
    let params = new HttpParams();
    if (query) {
      params = params.append('search', query);
    }
    return this.http.get<Event[]>(`${this.eventUrl}/search`, {params});
  }

  getAllCities(): Observable<string[]> {
    const url = `${this.eventUrl}/cities`;
    return this.http.get<string[]>(url);
  }

  getEventsByCity(city: string): Observable<Event[]> {
    const url = `${this.eventUrl}/cities/${city}`;
    return this.http.get<Event[]>(url);
  }

  isParticipating(eventId: string, userId: string): Observable<boolean> {
    const url = `${this.eventUrl}/${eventId}/participations/${userId}`;
    return this.http.get<boolean>(url);
  }

  deleteParticipation(eventId: string, userId: string): Observable<any> {
    const url = `${this.eventUrl}/${eventId}/participations/${userId}`;
    return this.http.delete<boolean>(url, {});
  }

  createReview(eventId: string, review: CreateReviewRequest): Observable<Review> {
    const url = `${this.eventUrl}/${eventId}/reviews`;
    return this.http.post<Review>(url, review);
  }

  getAllEventReviews(eventId: string): Observable<Review[]> {
    const url = `${this.eventUrl}/${eventId}/reviews`;
    return this.http.get<Review[]>(url);
  }

  getAllMyUpcomingEvent(id : string): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.eventUrl}/upcoming-events/participations/user/${id}`)
  }


  getAllMyPastEvent(id : string): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.eventUrl}/past-events/participations/user/${id}`)
  }

  getAllMyOwnedEvent(id : string): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.eventUrl}/owner/${id}`)
  }

}
