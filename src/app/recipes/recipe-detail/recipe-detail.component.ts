import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(
      `🔎 | RecipeDetailComponent | ngOnInit > id: `,
      this.route.snapshot.params['id']
    );

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  onAddToShoppingList() {
    console.log(`🔎 | RecipeDetailComponent | onAddToShoppingList`);
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
