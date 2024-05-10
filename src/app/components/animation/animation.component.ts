import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartComponent } from './cart/cart.component';
import { ItemsService } from '../../services/items.service';


@Component({
  selector: 'app-animation',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.scss'
})
export class AnimationComponent implements OnInit {

  router = inject(Router)
  item = inject(ItemsService)
  cartDialog!: MatDialogRef<CartComponent>
  drinks: any = []
  cartItems!: any[];

  constructor(private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.foodData();
    this.item.cart$.subscribe((res) => {
      this.cartItems = res;
      console.log(this.cartItems)
    })
  }


  foodData() {
    this.item.getFoodData().subscribe((data: any) => {
      console.log(data.drinks)
      this.drinks = data.drinks;
    })
  }

  addtoCart(item: any) {
    console.log(item)
    this.item.addToCart(item)
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  openCart() {
    this.cartDialog = this.dialog.open(CartComponent, {
      height: 'auto',
      width: '600px',
      data: this.cartItems
    })

    this.cartDialog.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result)
      }
    })
  }

  brickGame(){
    this.router.navigate(['brickBreaker'])
  }

}
