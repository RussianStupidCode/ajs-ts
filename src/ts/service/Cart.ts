import Goods from '../domain/Goods';
import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Map<number, Goods> = new Map();
    private _changeCount(goods: Goods, count: number): void {
        goods.count = goods.item.isMany? count + goods.count: 1; 
    }
    private _addNewGoods(item: Buyable) {
        const newGoods: Goods = {
            item,
            count: 1
        };
        this._items.set(item.id, newGoods);
    }

    add(item: Buyable, count: number = 1): void {
        const goods = this._items.get(item.id);   
        
        if (goods !== undefined) {
            this._changeCount(goods, count);
            return;
        }

        this._addNewGoods(item);
    }

    remove(item: Buyable, count: number = Infinity): void {
        const goods = this._items.get(item.id);
        if(goods === undefined) {
            return;
        }

        this._changeCount(goods, -count);

        if (!item.isMany || goods.count < 1) {
            this._items.delete(item.id);
        }
    }

    getTotalCost(discountPercent: number): number {
        const priceCoeff: number = (100 - discountPercent) / 100;
        return this.items.reduce((accum, goods) => accum + goods.count * goods.item.price * priceCoeff, 0);
    }

    get items(): Goods[] {
        return [...this._items.values()]; 
    }
}
