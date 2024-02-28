import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private shoppinglistService: ShoppingListService) {}

  addIngredients() {
    console.log(`🔎 | shopping-edit | addIngredients`);
    const newIngredient = new Ingredient(
      this.name.nativeElement.value,
      this.amount.nativeElement.value
    );

    this.shoppinglistService.addIngredient(newIngredient);
  }
}
