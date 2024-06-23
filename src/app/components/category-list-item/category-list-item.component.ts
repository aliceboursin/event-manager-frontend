import { Component, Input } from "@angular/core";
import { Category } from "../../data/category";

@Component({
    selector: 'app-category-list-item',
    templateUrl: './category-list-item-component.html',
    styleUrls: ['./category-list-item.component.css']
})
export class CategoryListItemComponent {
    @Input()
    category!: Category;
}
