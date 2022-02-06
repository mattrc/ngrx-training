import { BooksApiActions, BooksPageActions } from '@book-co/books-page/actions';
import { BookModel, calculateBooksGrossEarnings } from '@book-co/shared-models';
import { createReducer, createSelector, on } from '@ngrx/store';

export interface FeatureState {
  collection: BookModel[];
  activeBookId: string | null;
}

const initialState: FeatureState = {
  collection: [],
  activeBookId: null,
};

// Reducer
export const reducer = createReducer(
  initialState,
  on(
    BooksPageActions.load, //
    BooksPageActions.clearBook,
    (state: FeatureState) => {
      return {
        ...state,
        activeBookId: null,
      };
    },
  ),
  on(BooksPageActions.selectBook, (state: FeatureState, action: any) => {
    return {
      ...state,
      activeBookId: action.book.id,
    };
  }),
  on(BooksApiActions.loaded, (state: FeatureState, action: any) => {
    return {
      ...state,
      collection: action.books,
    };
  }),
  on(BooksApiActions.created, (state: FeatureState, action: any) => {
    return {
      ...state,
      collection: [...state.collection, action.book],
    };
  }),
  on(BooksApiActions.updated, (state: FeatureState, action: any) => {
    return {
      ...state,
      activeBookId: null,
      collection: state.collection.map(item => {
        if (item.id === action.book.id) {
          return action.book;
        }

        return item;
      }),
    };
  }),
  on(BooksApiActions.deleted, (state: FeatureState, action: any) => {
    return {
      ...state,
      collection: state.collection.filter(book => book.id !== action.id),
    };
  }),
);

// Selectors
export function selectAll(state: FeatureState) {
  return state.collection;
}

export function selectActiveBookId(state: FeatureState) {
  return state.activeBookId;
}

export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books: BookModel[], activeBookId: string | null) => {
    return books.find(book => book.id === activeBookId) ?? null;
  },
);

export const selectEarningsTotals = createSelector(
  selectAll, //
  calculateBooksGrossEarnings,
);
