import { Product } from './products';
export class ShoppingCartItem{
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;    

    constructor(init?: Partial<ShoppingCartItem> ){
        Object.assign(this, init);
    }

    get subTotalPrice(){
        return this.price * this.quantity;
    }

}

