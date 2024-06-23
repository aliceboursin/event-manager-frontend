import { Category } from "./category";
import { User } from "./user";
import {Time} from "@angular/common";


export interface Event {
    id: string;
    title: string;
    city : string;
    address : string;
    date : Date;
    time : Time;
    description : String;
    category : Category;
    owner : User;
}

export type UpdateEventRequest= Omit<Event, "id" | "owner"> ;

export interface CreateEventRequest {
  title: string;
  city : string;
  address : string;
  date : Date;
  time : Time;
  description : String;
  category : Category;
  owner : String;
}
