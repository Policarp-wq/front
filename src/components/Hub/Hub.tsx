import { useEffect } from "react"
import { ProductList } from "./ProductList"
import { VendingHead } from "./VendingHead"
import { loadProducts, selectLoading, selectProducts, selectFilteredProducts, selectHasFiltered } from "../../storage/productsSlice"
import { useDispatch, useSelector } from "../../storage/store"
import { clearCart } from "../../storage/cartSlice"

export const Hub = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const filteredProducts = useSelector(selectFilteredProducts);
    const hasFiltered = useSelector(selectHasFiltered);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    return (
        <div className="w-full h-max flex flex-col justify-center items-center pr-[5%] pl-[5%] max-w-[1680px]">
            <VendingHead/>
            {loading ? <div>Загрузка...</div> : <ProductList products={hasFiltered ? filteredProducts : products}/>}
        </div>
    )
}