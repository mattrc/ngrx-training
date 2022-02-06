import { Injectable } from '@angular/core';
import { BooksApiActions, BooksPageActions } from '@book-co/books-page/actions';
import { BooksService } from '@book-co/shared-services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class BooksApiEffects {
  constructor(
    private actions$: Actions, //
    private booksService: BooksService,
  ) {}

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.load),
      exhaustMap(() => {
        return this.booksService.all().pipe(
          map(books => BooksApiActions.loaded({ books })), //
        );
      }),
    );
  });

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.createBook),
      concatMap(({ payload }) => {
        return this.booksService.create(payload).pipe(
          map(book => BooksApiActions.created({ book })), //
        );
      }),
    );
  });

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.updateBook),
      concatMap(({ id, payload }) => {
        return this.booksService
          .update(id, payload)
          .pipe(map(book => BooksApiActions.updated({ book })));
      }),
    );
  });

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.deleteBook),
      mergeMap(({ id }) => {
        return this.booksService.delete(id).pipe(map(() => BooksApiActions.deleted({ id })));
      }),
    );
  });
}
