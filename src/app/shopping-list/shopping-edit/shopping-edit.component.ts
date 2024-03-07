import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppinglistService.startingEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddIngredients(form: NgForm) {
    console.log(`🔎 | shopping-edit | addIngredients`);

    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    this.shoppinglistService.addIngredient(newIngredient);
  }
}
