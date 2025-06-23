import { CoinValues, type CoinValue, type Order, type OrderCoin, type OrderProduct} from "../../models/types";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { client } from "../../utils";
import { useState } from "react";
import { CoinItem } from "./CoinItem";
import { useDispatch, useSelector } from "../../storage/store";
import { clearCart, selectItems, selectTotal } from "../../storage/cartSlice";

type CoinQuantityMap = Record<CoinValue, number>;

export const CoinPage = () => {
    const initialCoinQuantity: CoinQuantityMap = CoinValues.reduce((acc, v) => {
        acc[v as CoinValue] = 0;
        return acc;
    }, {} as CoinQuantityMap);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [coinQuantity, setCoinQuantity] = useState<CoinQuantityMap>(initialCoinQuantity);
    const totalOrderPrice = useSelector(selectTotal);
    const sum = Object.entries(coinQuantity).reduce((prev, [value, quantity]) => prev + Number(value) * quantity, 0);
    const items = useSelector(selectItems);
    const isEnough = totalOrderPrice <= sum; 

    const handleAmountChange = (value: CoinValue, quantity: number) => {
        setCoinQuantity(prev => ({
            ...prev,
            [value]: quantity
        }));
    };

    const makeOrder = () => {
        if(!isEnough)
            return;
        const orderItems: OrderProduct[] = items.map(i => {
            return {
                productId: i.product.id,
                quantity: i.quantity
            }
        });
        const coins: OrderCoin[] = Object.entries(coinQuantity).map(([value, quantity]) => ({
            valueName:  +value as CoinValue,
            quantity
        }));
        const order: Order = {
            products: orderItems,
            coins,
            total: totalOrderPrice
        }
        client
        .sendOrder(order)
        .then(res => {
            dispatch(clearCart());
            navigate("/change", {state: res})
        })
        .catch(err => {
            alert(err)
        })
    }
    return(
      <div className="w-full pr-[5%] pl-[5%] max-w-[1680px]">
            <h1 className="text-[26px] mb-[20px]">Оплата </h1>
            <table className="table-auto w-full border-b-2 pb-[6px] border-b-gray-300 ">
                <thead className="border-b-2 border-b-gray-300 ">
                    <tr className="text-[22px] ">
                        <th className="w-1/10 text-left pl-[10px] py-4 font-medium">Номинал</th>
                        <th className="w-4/10 text-left py-4"></th>
                        <th className="w-2/10 py-4 font-medium" >Количество</th>
                        <th className="w-3/10 py-4 font-medium">Сумма</th>
                    </tr>
                </thead>
                <tbody className="mt-4 align-top">
                    {CoinValues.map(v => 
                       <CoinItem
                         key={v}
                         value={v as CoinValue}
                         onAmountChange={q => handleAmountChange(v as CoinValue, q)}
                       />
                    )}
                </tbody>
            </table>
            <div className="flex flex-col mt-[30px] gap-[50px]">
                <div className="flex justify-end">
                    <p className="text-[20px]">Итоговая сумма: <span className={`text-[24px] font-bold ${!isEnough ? "text-red-500" : "" }`}>{totalOrderPrice} руб.</span> </p>
                    <p className="text-[20px]">Вы внесли: <span className='text-[24px] font-bold ${}'>{sum} руб.</span> </p>
                </div>
                <div className="flex flex-row justify-between">
                    <Button theme="yellow" addStyle="min-w-[200px]" text="Вернуться" onClick={_ => navigate(-1)}/>
                    <Button theme="green" addStyle="min-w-[200px] " text="Оплата" onClick={_ => makeOrder()} disabled={!isEnough}/>
                </div>
            </div>
        </div>
    )
}