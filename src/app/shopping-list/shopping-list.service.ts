// import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

// Even though we can remove this service from the providers array in the recipe.component
// and instead use the @Injectable way, we will ignore this in favor of
// following the guide properly.
// @Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients = () => this.ingredients.slice();

  addIngredient(ingredient: Ingredient) {
    console.log(`🔎 | shopping-list-service | addIngredient`);

    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    console.log(`🔎 | shopping-list-service | addIngredients`);

    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
