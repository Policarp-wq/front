export interface Product{
    id: number,
    name: string,
    brand: string,
    price: number,
    amount: number,
    image: string | null
}

export interface ProductFilter {
    brand: string | null,
    minPrice: number | null,
    maxPrice: number | null
}

export interface Brand{
    name: string
}

export interface OrderProduct {
    productId: number;         
    quantity: number;   
}
export type CoinValue = 1 | 2 | 5 | 10;
export const CoinValues: number[] = [1, 2, 5, 10]
export interface OrderCoin {
    valueName: CoinValue; 
    quantity: number;       
}

export interface Order {
    products: OrderProduct[];
    coins: OrderCoin[];
    total: number;
}

export const defaultImage = "https://tsx.x5static.net/i/800x800-fit/xdelivery/files/2f/0b/7fc1c7700a1c2c3081c778e74381.png";