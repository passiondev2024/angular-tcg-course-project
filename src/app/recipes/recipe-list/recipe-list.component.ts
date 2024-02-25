import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwEYYBbD33ig9Pbcel7iOhKc_wUt6k2wiFrg&usqp=CAU'
    ),
    new Recipe(
      'A second Test Recipe',
      'This is secondly a test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwEYYBbD33ig9Pbcel7iOhKc_wUt6k2wiFrg&usqp=CAU'
    ),
  ];
}
