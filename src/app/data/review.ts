import { Category } from "./category";
import { User } from "./user";
import {Time} from "@angular/common";


export interface Review {
    id: string;
    event : Event,
    owner: User;
    comment : string;
    grade : number;
    date : Date;
}


export interface CreateReviewRequest {
  eventId : string,
  userId: string;
  comment : string;
  grade : number;
}
