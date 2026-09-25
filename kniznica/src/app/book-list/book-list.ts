import { Component } from '@angular/core';
import { Book } from '../book';
import { BookCard } from '../book-card/book-card';

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  books: Book[] = [
    {
      id: 1,
      title: 'Hobit',
      author: 'J. R. R. Tolkien',
      year: 1937,
      available: true,
      genre: 'Fantasy'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      year: 1949,
      available: false,
      genre: 'Dystopia'
    },
    {
      id: 3,
      title: 'Malý princ',
      author: 'Antoine de Saint-Exupéry',
      year: 1943,
      available: true,
      genre: 'Fiction'
    }
  ];
}