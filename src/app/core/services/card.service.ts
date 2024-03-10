import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PokemonTypes, ResponsePokemonTypes, Card, ResponseCard } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private _httpClient = inject(HttpClient);
  private _httpHeaders = new HttpHeaders();

  getTypes(): Observable<PokemonTypes[]> {
    const headers = this._httpHeaders.set('X-Api-Key', environment.apiKey)
    return this._httpClient.get<ResponsePokemonTypes>(`${environment.pokemonApi}/types`, { headers }).pipe(map( res => res.types));
  }

  getCards(): Observable<Card[]> {
    const headers = this._httpHeaders.set('X-Api-Key', environment.apiKey)
    return this._httpClient.get<ResponseCard>(`${environment.pokemonApi}/cards`, { headers }).pipe(map( res => res.cards))
  }
}
