import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  BASE_URL =
    'https://angular-tcg-course-project-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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

    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(`${this.BASE_URL}/recipes.json`, {
          params: new HttpParams().set('auth', user.token),
        });
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        console.log(
          `🔎 | DataStorageService | fetchRecipes > tap recipes:`,
          recipes
        );
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
