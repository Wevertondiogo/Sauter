import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, DestroyRef, ViewChild, computed, inject, signal } from '@angular/core';
import { IgxButtonModule, IgxCardModule, IgxDialogModule, IgxIconModule, IgxRippleModule } from 'igniteui-angular';
import { Router } from '@angular/router';
import { Deck, PokemonTypes } from '../../../core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { finalize, switchMap } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DeckTabComponent } from './../../components/deck-tab/deck-tab.component';
import { DeckService } from '../../../core/services/deck.service';
import { CardService } from '../../../core/services/card.service';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [
    CommonModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    IgxDialogModule,
    NgxSpinnerModule,
    DeckTabComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './deck-list.component.html',
  styleUrl: './deck-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckListComponent {
  @ViewChild('dialogConfirmation', { static: true }) dialogConfirmation!: any;
  @ViewChild('dialogDetail', { static: true }) dialogDetail!: any;
  decks = signal<Deck[]>([]);
  pokemonType = 'Pokémon';
  trainerType = 'Trainer';
  energyType = 'Energy';
  currentDeck = signal<Deck>({} as Deck);
  selectedCards = computed(() => this.currentDeck().cards?.filter(card => card.selected) ?? []);
  selectedPokemons = computed(() => this.selectedCards().filter(card => card.supertype === this.pokemonType));
  selectedTrainers = computed(() => this.selectedCards().filter(card => card.supertype === this.trainerType));
  selectedEnergies = computed(() => this.selectedCards().filter(card => card.supertype === this.energyType));
  types = signal<PokemonTypes[]>([]);
  selectedTypes = computed(() => this.selectedCards().filter(card => card.selected).flatMap(card => card.types));

  private _deckService = inject(DeckService);
  private _cardService = inject(CardService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _spinnerService = inject(NgxSpinnerService);


  ngOnInit() {
    this.getDeck();
    this.getTypes();
  }

  addDeck(): void {
    this._router.navigateByUrl('/add');
  }

  editDeck(id: string, event?: Event) {
    event?.stopImmediatePropagation();
    this._router.navigateByUrl(`edit/${id}`);
  }

  openDetail(deck: Deck) {
    this.currentDeck.set(deck);
    this.dialogDetail.open();
  }

  removeDeck() {
    if(this.currentDeck()) {
      this._spinnerService.show();
       this._deckService.deleteDeck(this.currentDeck().id!).pipe(takeUntilDestroyed(this._destroyRef), finalize(() => this._spinnerService.hide()),
        switchMap(() => this._deckService.getDeck()))
       .subscribe((res) => {
        this.decks.set(res);
        this.dialogConfirmation.close();
       });
    }
  }

  openConfirmDialog(event: Event, deck: Deck) {
    event.stopImmediatePropagation();
    this.currentDeck.set(deck);
    this.dialogConfirmation.open();
  }

  getTotalOfSelected(deck: Deck, supertype: string) {
    const selectedCards = deck.cards.filter(card => card.selected);
    const filterBySuperType = selectedCards.filter(card => card.supertype === supertype);
    return filterBySuperType.length;
  }

  private getDeck() {
    this._spinnerService.show();
    this._deckService.getDeck().pipe(takeUntilDestroyed(this._destroyRef), finalize(() => this._spinnerService.hide())).subscribe(res => {
      this.decks.set(res);
    });
  }

  private getTypes() {
    this._cardService.getTypes().pipe(takeUntilDestroyed(this._destroyRef)).subscribe(res => this.types.set(res))
  }

}
