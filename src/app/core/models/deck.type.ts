import { Card } from "./card.type"

export type Deck = {
  id?: string;
  name: string;
  cards: Card[];
}
