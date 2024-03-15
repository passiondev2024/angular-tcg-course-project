import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  BASE_URL =
    'https://angular-tcg-course-project-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    console.log(`🔎 | DataStorageService | storeRecipes`);
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(`${this.BASE_URL}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log(
          `🔎 | DataStorageService | storeRecipes > response:`,
          response
        );
      });
  }

  fetchRecipes() {
    console.log(`🔎 | DataStorageService | fetchRecipes`);

    this.http
      .get<Recipe[]>(`${this.BASE_URL}/recipes.json`)
      .subscribe((recipes) => {
        console.log(
          `🔎 | DataStorageService | fetchRecipes > recipes:`,
          recipes
        );
        this.recipeService.setRecipes(recipes);
      });
  }
}
