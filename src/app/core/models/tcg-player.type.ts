import { Price } from "./price.type";

export type TcgPlayer = {
  url: string;
  updatedAt: string;
  prices: Price;
};
