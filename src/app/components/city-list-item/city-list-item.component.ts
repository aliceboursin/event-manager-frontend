import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-city-list-item',
    templateUrl: './city-list-item-component.html',
    styleUrls: ['./city-list-item.component.css']
})
export class CityListItemComponent {
    @Input()
    city!: string;
}
