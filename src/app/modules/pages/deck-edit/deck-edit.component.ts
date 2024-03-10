import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IgxInputGroupModule, IgxIconModule, IgxTabsModule, IGX_DIALOG_DIRECTIVES } from 'igniteui-angular';
import { Deck, Card, PokemonTypes } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { TotalTypesPipe } from './../../../shared/pipes/total-types.pipe';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeckTabComponent } from './../../components/deck-tab/deck-tab.component';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { DeckService } from '../../../core/services/deck.service';
import { CardService } from '../../../core/services/card.service';

@Component({
  selector: 'app-deck-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,IgxIconModule, IgxTabsModule, IGX_DIALOG_DIRECTIVES, NgxSpinnerModule, IgxInputGroupModule, TotalTypesPipe, DeckTabComponent],
  templateUrl: './deck-edit.component.html',
  styleUrl: './deck-edit.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckEditComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert!: any;
  @Input() id?: string;
  itemsPerPage = [24, 44, 64];
  selectedCards = signal<Card[]>([]);
  pokemonType = 'Pokémon';
  trainerType = 'Trainer';
  energyType = 'Energy';
  selectedPokemons = computed(() => this.selectedCards().filter(card => card.supertype === this.pokemonType) ?? []);
  selectedTrainers = computed(() => this.selectedCards().filter(card => card.supertype === this.trainerType) ?? []);
  selectedEnergies = computed(() => this.selectedCards().filter(card => card.supertype === this.energyType) ?? []);
  types = signal<PokemonTypes[]>([]);
  cards = signal<Card[]>([]);
  selectedTypes = computed(() => this.selectedCards().flatMap(card => card.types));
  uniqueTypes = computed(() => [...new Set(this.selectedTypes())]);
  message = signal('');
  isLoaded = signal(false);
  deckName = new FormControl('New Deck', Validators.required);
  search = signal('');
  searchCard = computed(() => this.cards().filter(card => card.name.toLowerCase().includes(this.search().toLowerCase())))

  private _destroyRef = inject(DestroyRef);
  private _deckService = inject(DeckService);
  private _cardService = inject(CardService);
  private _router = inject(Router);
  private _spinnerService = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.getCards();
    this.getTypes();
  }


toggleCard(card: Card) {
  this.selectedCards.update(cards => {
    if(cards.length === 60 && !card.selected) {
      this.showAlert('maximum selected cards reached');
      return cards
    }
    card.selected = !card.selected;

    if(!card.selected) {
      const currentCards = cards.filter(item => item.id !== card.id)
      return currentCards;
    }

    if(this.hasFourCards(card.name, cards)) {
      this.showAlert('There can only be 4 cards with the same name');
      return cards;
    }

    return [...cards, card]
  });
}

getTotalTypes(type: string) {
  return this.selectedTypes().filter(value => value === type).length;
}

saveDeck() {
  if(this.deckName.invalid) {
    this.showAlert('Please fill in the deck name field');
    return;
  }

  if(this.selectedCards().length <= 23) {
    this.showAlert('The deck must have at least 24 cards');
    return;
  }

  this._spinnerService.show();

  const deck = { name: this.deckName.value!, cards: this.cards() } as Deck;

  if(this.id) {
    this._deckService.updateDeck(this.id, deck).pipe(takeUntilDestroyed(this._destroyRef),
     finalize(() => this._spinnerService.hide())).subscribe(() => this.back());
    return;
  }
  this._deckService.saveDeck(deck).pipe(takeUntilDestroyed(this._destroyRef),
   finalize(() => this._spinnerService.hide())).subscribe(() => this.back());
}

back() {
  this._router.navigateByUrl('/');
}

private showAlert(message: string) {
  this.message.set(message);
  this.alert.open();
}

private getCards() {
  this._spinnerService.show();
  if(this.id) {
    this._deckService.getDeckById(this.id).pipe(takeUntilDestroyed(this._destroyRef),
    finalize(() => this._spinnerService.hide()))
    .subscribe(({ cards, name }) => {
      this.cards.set(cards);
      this.selectedCards.update(() => this.cards().filter(card => card.selected));
      this.isLoaded.set(true);
      this.deckName.setValue(name)
    });
    return;
  }

  this._cardService.getCards().pipe(takeUntilDestroyed(this._destroyRef),
   finalize(() => {
    this._spinnerService.hide();
  })).subscribe(res => {
    this.cards.set(res);
    this.isLoaded.set(true);
  });
}

private getTypes() {
  this._cardService.getTypes().pipe(takeUntilDestroyed(this._destroyRef)).subscribe(res => this.types.set(res))
}

private hasFourCards(name: string, cards: Card[]) {
  const total = cards.filter(card => card.name === name)?.length;
  return total === 4;
}

}
