import { BookModel, BookRequiredProps } from '@book-co/shared-models';
import { createAction, props } from '@ngrx/store';

export const load = createAction(
  '[Books Page] Load', //
);

export const createBook = createAction(
  '[Books Page] Create', //
  props<{ payload: BookRequiredProps }>(),
);

export const updateBook = createAction(
  '[Books Page] Update', //
  props<{ id: string; payload: BookRequiredProps }>(),
);

export const deleteBook = createAction(
  '[Books Page] Delete', //
  props<{ id: string }>(),
);

export const selectBook = createAction(
  '[Books Page] Select', //
  props<{ book: BookModel }>(),
);

export const clearBook = createAction(
  '[Books Page] Clear', //
);
