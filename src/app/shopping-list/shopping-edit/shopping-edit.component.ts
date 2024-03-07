import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  constructor(private shoppinglistService: ShoppingListService) {}

  onAddIngredients(form: NgForm) {
    console.log(`🔎 | shopping-edit | addIngredients`);

    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    this.shoppinglistService.addIngredient(newIngredient);
  }
}
