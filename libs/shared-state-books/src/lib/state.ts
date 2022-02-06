import { NgModule } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import * as fromBooks from './books.reducer';

export const FEATURE_KEY = 'shared-books';

/**
 * State Shape
 **/
export interface AppState {
  books: fromBooks.FeatureState;
}

export const reducers: ActionReducerMap<AppState> = {
  books: fromBooks.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

/**
 * Module
 **/
@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers })],
})
export class SharedStateBooksModule {}

/**
 * Feature Selector
 **/
export const selectSharedBooksState = createFeatureSelector<AppState>(FEATURE_KEY);

/**
 * Books Selectors
 */
export const selectBooksState = createSelector(
  selectSharedBooksState,
  (sharedBooksFeatureState: AppState) => sharedBooksFeatureState.books,
);

export const selectAllBooks = createSelector(selectBooksState, fromBooks.selectAll);

export const selectActiveBook = createSelector(selectBooksState, fromBooks.selectActiveBook);

export const selectBooksEarningsTotals = createSelector(
  selectBooksState,
  fromBooks.selectEarningsTotals,
);

// function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
//   return (state, action) => {
//     console.log('state', state);
//     console.log('action', action);
//     console.log('---------------');

//     return reducer(state, action);
//   };
// }
