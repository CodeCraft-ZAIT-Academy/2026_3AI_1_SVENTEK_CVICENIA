import { Component, OnInit, inject, signal } from '@angular/core';
import { BookApiService } from '../../book-api.service';
import { Book } from '../../book';

@Component({
  selector: 'app-server-book-list',
  standalone: true,
  imports: [],
  templateUrl: './server-book-list.html',
  styleUrl: './server-book-list.css'
})
export class ServerBookList implements OnInit {

  private readonly bookApi = inject(BookApiService);

  books = signal<Book[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.bookApi.getBooks().subscribe({
      next: (books) => {
        this.books.set(books);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Nepodarilo sa načítať knihy zo servera.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }
}
