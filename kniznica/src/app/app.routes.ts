import { Routes } from '@angular/router';
import { BookPage } from './books/components/book-page/book-page';
import { BookList } from './books/components/book-list/book-list';
import { CartPage } from './cart/components/cart-page/cart-page';
import { AdminBooks } from './admin/components/admin-books/admin-books';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookList, title: 'Knihy' },
  { path: 'cart', component: CartPage, title: 'Košík' },
  { path: 'admin/books', component: AdminBooks, title: 'Správa kníh' },
  { path: 'books/:id', component: BookPage, title: 'Detail knihy' },
  { path: '**', redirectTo: 'books' }
];