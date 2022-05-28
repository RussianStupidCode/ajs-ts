import Buyable from './Buyable';

export default class Movie implements Buyable {
  constructor(
    readonly id: number,
    readonly year: number,
    readonly name: string,
    readonly country: string,
    readonly jenre: string[],
    readonly duration: number,
    readonly tagline: string,
    readonly price: number,
    readonly isMany: boolean = false,
  ) { }
}
