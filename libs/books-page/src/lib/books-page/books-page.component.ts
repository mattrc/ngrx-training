import { Component, OnInit } from '@angular/core';
import { BooksPageActions } from '@book-co/books-page/actions';
import { BookModel, BookRequiredProps } from '@book-co/shared-models';
import {
  selectActiveBook,
  selectAllBooks,
  selectBooksEarningsTotals,
} from '@book-co/shared-state-books';
import { Store } from '@ngrx/store';

@Component({
  selector: 'bco-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent implements OnInit {
  books$ = this.store.select(selectAllBooks);
  currentBook$ = this.store.select(selectActiveBook);
  total$ = this.store.select(selectBooksEarningsTotals);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(BooksPageActions.load());
  }

  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({ book }));
  }

  onCancel() {
    this.store.dispatch(BooksPageActions.clearBook());
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ('id' in book) {
      this.store.dispatch(BooksPageActions.updateBook({ id: book.id, payload: book }));
    } else {
      this.store.dispatch(BooksPageActions.createBook({ payload: book }));
    }
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({ id: book.id }));
  }
}
