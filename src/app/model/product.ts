import {Category} from './category';
import {Promotion} from './promotion';
import {MiniMarket} from './mini-market';
import {Manufacturer} from './manufacturer';

export class Product {

    constructor(private _id: number,
                private _name: string,
                private _price: number,
                private _quantity: number,
                private _iconPath: string,
                private _category: Category,
                private _promotion: Promotion,
                private _miniMarket: MiniMarket,
                private _manufacturer: Manufacturer) {
    }

    get id(): number {
        return this._id;
    }

    get category(): Category {
        return this._category;
    }

    set category(value: Category) {
        this._category = value;
    }

    get promotion(): Promotion {
        return this._promotion;
    }

    set promotion(value: Promotion) {
        this._promotion = value;
    }

    get miniMarket(): MiniMarket {
        return this._miniMarket;
    }

    set miniMarket(value: MiniMarket) {
        this._miniMarket = value;
    }

    get manufacturer(): Manufacturer {
        return this._manufacturer;
    }

    set manufacturer(value: Manufacturer) {
        this._manufacturer = value;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get iconPath(): string {
        return this._iconPath;
    }

    set iconPath(value: string) {
        this._iconPath = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

}
