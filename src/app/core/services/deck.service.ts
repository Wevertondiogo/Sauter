import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Deck } from '../models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private _httpClient = inject(HttpClient);

  saveDeck(deck: Deck): Observable<Deck> {
    return this._httpClient.post<Deck>(environment.jsonServerApi, deck);
  }

  updateDeck(id: string, deck: Deck): Observable<Deck> {
    return this._httpClient.put<Deck>(`${environment.jsonServerApi}/${id}`, deck);
  }

  getDeckById(id: string): Observable<Deck> {
    return this._httpClient.get<Deck>(`${environment.jsonServerApi}/${id}`);
  }

  getDeck(): Observable<Deck[]> {
    return this._httpClient.get<Deck[]>(environment.jsonServerApi);
  }

    deleteDeck(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${environment.jsonServerApi}/${id}`);
  }

}
