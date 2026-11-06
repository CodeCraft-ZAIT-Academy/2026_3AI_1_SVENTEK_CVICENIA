import { Component, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { BookDetail } from '../book-detail/book-detail';
import { getGenreColor } from '../../genre-colors';
import { Book } from '../../book';

@Component({
  selector: 'app-book-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BookDetail,
    RouterLink
  ],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {

  book = input.required<Book>();

  borrowed = output<void>();
  returned = output<void>();
  favoriteToggled = output<void>();

  readonly showDetails = signal(false);

  toggleDetails(): void {
    this.showDetails.update(open => !open);
  }

  toggleFavorite(): void {
    this.favoriteToggled.emit();
  }

  borrow(): void {
    this.borrowed.emit();
  }

  giveBack(): void {
    this.returned.emit();
  }

  genreColor(): string {
    return getGenreColor(this.book().genre);
  }
}
