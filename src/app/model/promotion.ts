import {Product} from './product';

export class Promotion {

    constructor(private _id: number, private _name: string, private _description: string,
                private _productId: Product, private _expireDate: number, private _quantityNeeded) {
    }

    get id(): number {
        return this._id;
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

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get productId(): Product {
        return this._productId;
    }

    set productId(value: Product) {
        this._productId = value;
    }

    get expireDate(): number {
        return this._expireDate;
    }

    set expireDate(value: number) {
        this._expireDate = value;
    }

    get quantityNeeded() {
        return this._quantityNeeded;
    }

    set quantityNeeded(value) {
        this._quantityNeeded = value;
    }
}
