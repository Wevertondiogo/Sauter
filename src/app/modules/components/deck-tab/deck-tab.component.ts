import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IgxTabsModule } from 'igniteui-angular';
import { Card, PokemonTypes } from '../../../core/models';
import { TotalTypesPipe } from '../../../shared/pipes/total-types.pipe';

@Component({
  selector: 'app-deck-tab',
  standalone: true,
  imports: [CommonModule, IgxTabsModule, TotalTypesPipe],
  templateUrl: './deck-tab.component.html',
  styleUrl: './deck-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckTabComponent {
  selectedPokemons = input.required<Card[]>();
  selectedTrainers = input.required<Card[]>();
  selectedEnergies = input.required<Card[]>();
  selectedTypes = input.required<string[]>();
  types = input.required<PokemonTypes[]>();
  pokemonType = input.required<string>();
  trainerType = input.required<string>();
  energyType = input.required<string>();
  contentHeightClass = input('max-h-85');
}
