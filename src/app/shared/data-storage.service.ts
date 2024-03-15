import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
