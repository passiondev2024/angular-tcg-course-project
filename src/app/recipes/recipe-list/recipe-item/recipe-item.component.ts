import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() onRecipeClicked = new EventEmitter<void>();

  onClick() {
    console.log(`🔎 | recipe-item | onClick`);
    this.onRecipeClicked.emit();
  }
}
