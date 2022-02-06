import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SharedStateBooksModule } from '@book-co/shared-state-books';
import { EffectsModule } from '@ngrx/effects';
import { BooksApiEffects } from './book-api.effects';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { BooksTotalComponent } from './books-total/books-total.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: BooksPageComponent,
      },
    ]),
    EffectsModule.forFeature([BooksApiEffects]),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    SharedStateBooksModule,
  ],
  declarations: [
    BookDetailComponent, //
    BooksListComponent,
    BooksPageComponent,
    BooksTotalComponent,
  ],
})
export class BooksPageModule {}
