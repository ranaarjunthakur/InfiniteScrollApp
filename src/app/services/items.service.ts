import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  https = inject(HttpClient)
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([])

  cart$ = this.cartSubject.asObservable()

  constructor(private http: HttpClient) { }


  getFoodData(): Observable<any> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  }

  addToCart(item: any) {
    this.cartItems.push(item);
    this.cartSubject.next(this.cartItems)
  }

  getCartItems():any {
    return this.cartItems
  }
}
