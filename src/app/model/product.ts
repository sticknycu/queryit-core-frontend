export class Product {

    constructor(private _id: number, private _name: string, private _iconUrl: string, private _quantity: number,
                private _price: number) {
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

    get iconUrl(): string {
        return this._iconUrl;
    }

    set iconUrl(value: string) {
        this._iconUrl = value;
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
