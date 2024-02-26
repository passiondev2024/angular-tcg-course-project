import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  @Output() onRecipePass = new EventEmitter<Recipe>();

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

  onRecipeSelected(recipe: Recipe) {
    console.log(`🔎 | recipe-list | onRecipeSelected`);
    this.onRecipePass.emit(recipe);
  }
}
