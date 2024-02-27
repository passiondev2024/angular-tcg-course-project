// import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

// Even though we can remove this service from the providers array in the recipe.component
// and instead use the @Injectable way, we will ignore this in favor of
// following the guide properly.
// @Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
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

  // getRecipes() {
  //   return this.recipes.slice();
  // }
  getRecipes = () => this.recipes.slice();
}
