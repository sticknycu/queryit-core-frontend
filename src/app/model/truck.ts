export class Truck {
    constructor(private _id: number, private _serialNumber: string) {
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get serialNumber(): string {
        return this._serialNumber;
    }

    set serialNumber(value: string) {
        this._serialNumber = value;
    }
}
