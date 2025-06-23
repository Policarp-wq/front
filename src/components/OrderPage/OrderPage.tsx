import { useDispatch, useSelector } from "../../storage/store"
import { clearCart, removeFromCart, selectItems, selectTotal, setAmount, type CartItem } from "../../storage/cartSlice";
import { OrderItem } from "./OrderItem";
import { defaultImage } from "../../models/types";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const OrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(selectItems);
    const sum = useSelector(selectTotal);

    const handleDelete = (id: number) => {
        dispatch(removeFromCart(id));
    }

    const handleAmountChange = (id: number, value: number) =>{
        dispatch(setAmount({id, value}));
    }

    const makeOrder = () => {
        navigate("/coins")
    }
    return(
      <div className="w-full pr-[5%] pl-[5%] max-w-[1680px]">
            <h1 className="text-[26px] mb-[20px]">Оформление заказа</h1>
            {items.length == 0 ? <h1>У вас нет ни одного товара, вернитесь на страница каталога</h1> :
            (<><table className="table-auto w-full border-b-2 pb-[6px] border-b-gray-300 ">
                <thead className="border-b-2 border-b-gray-300 ">
                    <tr className="text-[22px] ">
                        <th className="w-1/10 text-left pl-[10px] py-4 font-medium">Товар</th>
                        <th className="w-4/10 text-left py-4"></th>
                        <th className="w-2/10 py-4 font-medium" >Количество</th>
                        <th className="w-2/10 py-4 font-medium">Цена</th>
                        <th className="w-1/10 py-4"></th>
                    </tr>
                </thead>
                <tbody className="mt-4 align-top">
                    {items.map(i => 
                       <OrderItem
                         image={i.product.image ?? defaultImage}
                         name={i.product.name}
                         amount={i.quantity}
                         maxAmount={i.product.amount}
                         price={i.product.price}
                         onDelete={() => {handleDelete(i.product.id)}}
                         onAmountChange={(v) => handleAmountChange(i.product.id, v)}
                       />
                    )}
                </tbody>
            </table></>)}
            <div className="flex flex-col mt-[30px] gap-[50px]">
                <div className="flex justify-end">
                    <p className="text-[20px]">Итоговая сумма: <span className="text-[24px] font-bold">{sum} руб.</span> </p>
                </div>
                <div className="flex flex-row justify-between">
                    <Button theme="yellow" addStyle="min-w-[200px]" text="Вернуться" onClick={_ => navigate(-1)}/>
                    <Button theme="green" addStyle="min-w-[200px]" text="Оплата" onClick={_ => makeOrder()} disabled={items.length == 0}/>
                </div>
            </div>
        </div>
    )
} 