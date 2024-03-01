import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

// Even though we can remove this service from the providers array in the recipe.component
// and instead use the @Injectable way, we will ignore this in favor of
// following the guide properly.
// @Injectable({ providedIn: 'root' })
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome',
      'https://www.allrecipes.com/thmb/bu4s12dq2GNt-kgi9R8sZTrhQYo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pork-Schnitzel-ddmfs-3x2-113-7c044e725d604cb0b2a3827b63a7f6f6.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else is there to say?',
      'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
      [new Ingredient('Meat', 1), new Ingredient('buns', 2)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes = () => this.recipes.slice();

  getRecipeById = (index: number) => this.recipes[index];

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
