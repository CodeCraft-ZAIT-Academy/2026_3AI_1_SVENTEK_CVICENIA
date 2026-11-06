import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../book.service';
import { BookDetail } from '../book-detail/book-detail';

@Component({
  selector: 'app-book-page',
  imports: [RouterLink, MatButtonModule, BookDetail],
  templateUrl: './book-page.html',
  styleUrl: './book-page.css'
})
export class BookPage {
  private bookService = inject(BookService);

  id = input.required<string>();

  readonly book = computed(() =>
    this.bookService.getBookById(Number(this.id()))
  );
}