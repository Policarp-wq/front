import type { Product } from "../../models/types"
import { addToCart, removeFromCart } from "../../storage/cartSlice"
import { useDispatch } from "../../storage/store"
import { ProductCard, type TCardState } from "./ProductCard"

export type TProductListProps = {
    products: Product[]
}

export const ProductList = ({products} : TProductListProps)=> {
    const dispatch = useDispatch();
    const handleProductClicked = (state : TCardState,p : Product) => {
        if(state == "selected")
            dispatch(addToCart(p))
        else dispatch(removeFromCart(p.id))
    }
    return (
        <ul className="grid grid-cols-4 gap-[20px] mt-[30px]">
            {products.map(p => {
                return (
                    <ProductCard
                        key={p.id}
                        image={p.image}
                        name={p.name}
                        price={p.price}
                        initState={p.amount > 0 ? "available" : "sold out"}
                        onChange={(s) => handleProductClicked(s, p)}
                    />
                )
            })}
        </ul>
    )
}