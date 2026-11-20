
import { computed, inject, Injectable, signal } from '@angular/core';
import { BookApiService } from './book-api.service';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly bookApi = inject(BookApiService);

  readonly maxBorrowed: number = 10;

  readonly loading = signal(true);
  readonly loadError = signal('');

  private readonly _books = signal<Book[]>([]);
  readonly books = this._books.asReadonly();

  readonly borrowedBooks = computed(() =>
    this.books().filter(book => !book.available)
  );

  readonly availableBooks = computed(() =>
    this.books().filter(book => book.available)
  );

  readonly favoriteBooks = computed(() =>
    this.books().filter(book => book.favorite)
  );

  constructor() {
    this.bookApi.getBooks().subscribe({
      next: books => {
        this._books.set(this.limitBorrowed(books));
        this.loading.set(false);
      },
      error: error => {
        console.error('Načítanie kníh zo servera zlyhalo:', error);
        this.loadError.set(
          'Knihy sa nepodarilo načítať. Skontroluj, či JSON Server beží.'
        );
        this.loading.set(false);
      }
    });
  }

  limitBorrowed(books: Book[]): Book[] {
    let borrowedCount = 0;

    return books.map(book => {
      if (book.available) {
        return book;
      }

      borrowedCount++;

      if (borrowedCount > this.maxBorrowed) {
        return { ...book, available: true };
      }

      return book;
    });
  }

  addBook(book: Book): void {
    this._books.update(oldBooks => {
      const maxId = Math.max(0, ...oldBooks.map(b => b.id));
      return [{ ...book, id: maxId + 1 }, ...oldBooks];
    });
  }

  updateBook(updated: Book): void {
    this._books.update(books =>
      books.map(book =>
        book.id === updated.id ? updated : book
      )
    );
  }

  deleteBook(id: number): void {
    this._books.update(books =>
      books.filter(book => book.id !== id)
    );
  }

  borrowBook(id: number): boolean {
    if (!this.canBorrowBook(id)) return false;

    this._books.update(books =>
      books.map(book =>
        book.id === id
          ? { ...book, available: false }
          : book
      )
    );

    return true;
  }

  returnBook(id: number): void {
    this._books.update(books =>
      books.map(book =>
        book.id === id
          ? { ...book, available: true }
          : book
      )
    );
  }

  toggleFavorite(id: number): void {
    this._books.update(books =>
      books.map(book =>
        book.id === id
          ? { ...book, favorite: !book.favorite }
          : book
      )
    );
  }

  getSortedBooks(sortBy: string): Book[] {
    const result = [...this.books()];

    switch (sortBy) {
      case 'title':
        return result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

      case 'year':
        return result.sort((a, b) =>
          b.year - a.year
        );

      case 'rating':
        return result.sort((a, b) =>
          b.rating - a.rating
        );

      default:
        return result;
    }
  }

  getBooks(): Book[] {
    return [...this.books()];
  }

  getBookById(id: number): Book | undefined {
    return this.books().find(book => book.id === id);
  }

  getTotalBooksCount(): number {
    return this.books().length;
  }

  getBorrowedBooksCount(): number {
    return this.borrowedBooks().length;
  }

  canBorrowBook(id: number): boolean {
    const book = this.getBookById(id);

    return !!book &&
      book.available &&
      this.borrowedBooks().length < this.maxBorrowed;
  }

  countAvailableBooks(): number {
    return this.books().filter(book => book.available).length;
  }

  countFavoriteBooks(): number {
    return this.books().filter(book => book.favorite).length;
  }

  countAllBooks(): number {
    return this.books().length;
  }
}
