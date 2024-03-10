import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./modules/pages/deck-list/deck-list.component').then(m => m.DeckListComponent),
  },
  {
    path: 'add', loadComponent: () => import('./modules/pages/deck-edit/deck-edit.component').then(m => m.DeckEditComponent)
  },
  {
    path: 'edit/:id', loadComponent: () => import('./modules/pages/deck-edit/deck-edit.component').then(m => m.DeckEditComponent)
  }
];
