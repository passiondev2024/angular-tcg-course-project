// import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

// Even though we can remove this service from the providers array in the recipe.component
// and instead use the @Injectable way, we will ignore this in favor of
// following the guide properly.
// @Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startingEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients = () => this.ingredients.slice();

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    console.log(`🔎 | shopping-list-service | addIngredient`);

    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    console.log(`🔎 | shopping-list-service | addIngredients`);

    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    console.log(`🔎 | ShoppingListService | deleteIngredient:`, index);
    if (this.ingredients[index]) {
      this.ingredients.splice(index, 1);
      this.ingredientChanged.next(this.ingredients.slice());
    }
  }
}
