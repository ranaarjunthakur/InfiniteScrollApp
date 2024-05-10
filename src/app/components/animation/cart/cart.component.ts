import { Component, inject, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  itemService = inject(ItemsService)
  // data: any[] = []
  cartItem:any[]=[]
  count:any = 0;
  totalPrice: number = 0;
  product:any;

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit(): void {
   this.cartItem = this.itemService.getCartItems()
   console.log(this.cartItem)
  }


  increaseItem(price:any){
     this.count++
     let prices = parseFloat(price)
      prices++
    }

  decreaseItem(){
      this.count > 0 ? this.count-- : this.count = 0
  }

  deleteItem(item:any){
    this.cartItem.splice(this.cartItem.indexOf(this.product),1)
    this.cartItem = [...this.cartItem];
  }

  close() {
    this.dialogRef.close('Pizza!');
  }

}
