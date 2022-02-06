import { BookModel } from '@book-co/shared-models';
import { createAction, props } from '@ngrx/store';

export const loaded = createAction(
  '[Books Page] Loaded', //
  props<{ books: BookModel[] }>(),
);

export const deleted = createAction(
  '[Books Page] deleted', //
  props<{ id: string }>(),
);

export const created = createAction(
  '[Books Page] created', //
  props<{ book: BookModel }>(),
);

export const updated = createAction(
  '[Books Page] updated', //
  props<{ book: BookModel }>(),
);
