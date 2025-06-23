import axios from "axios";
import type { Brand, Order, OrderCoin, Product, ProductFilter } from "./models/types";

export class Client {
    private _baseUrl: string;
    constructor(url: string) {
        this._baseUrl = url;
    }

    private async request<T>(method: "get" | "post", path: string, data?: any): Promise<T> {
        const url = this._baseUrl + path;
        const response = await axios({
            url,
            method,
            data,
        });
        return response.data;
    }

    public get<T>(path: string): Promise<T> {
        return this.request<T>("get", path, undefined);
    }

    public post<T>(path: string, data?: any): Promise<T> {
        return this.request<T>("post", path, data);
    }

    public getBrands(): Promise<Brand[]>{
        return this.get<Brand[]>("/brand");
    }

    public getProducts(): Promise<Product[]> {
        return this.get<Product[]>("/product");
    }
    public getFilteredProducts(filter: ProductFilter) {
        const params = new URLSearchParams();

        if (filter.brand ) params.append('brand', filter.brand);
        if (filter.minPrice) params.append('minPrice', String(filter.minPrice));
        if (filter.maxPrice) params.append('maxPrice', String(filter.maxPrice));

        return this.get<Product[]>(`/product/filtered?${params.toString()}`);
    }
    public sendOrder(order: Order ): Promise<OrderCoin[]>{
        return this.post<OrderCoin[]>("/order", order);
    }
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const client = new Client(BASE_URL);