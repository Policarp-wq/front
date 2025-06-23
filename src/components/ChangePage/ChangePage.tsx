import { useLocation, useNavigate } from "react-router-dom";
import { CoinValues, type CoinValue, type OrderCoin } from "../../models/types"
import { Button } from "../Button";
import { Coin } from "../Coin";

export type TChangeResponse = {
    values: OrderCoin[]
}

export const ChangePage = () => {
    const location = useLocation();

    const values: OrderCoin[] = location.state ?? [];
    const navigate = useNavigate();
    const total = values.length == 0 ? 0 : values.map((v) => v.valueName * v.quantity).reduce((prev, cur) => prev + cur, 0);
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-[28px]  font-bold text-center">Спасибо за покупку!</h1>
            <h1 className="text-[28px] font-bold text-center">Пожалуйста, возьмите вашу сдачу: <span className="text-green-500">{total}</span></h1>
            <h2 className="text-[28px] font-bold text-center mt-[76px]">Ваши монеты:</h2>
            <ul className="flex flex-col justify-center items-center">
                {CoinValues.map((v) => {
                    const found = values.find(val => val.valueName === v);
                    const quantity = found ? found.quantity : 0;
                    return(
                        <li key={v} className="flex items-center gap-2 mb-2">
                            <Coin value={v as CoinValue}/>
                            <p>{quantity} шт.</p>
                        </li>
                    )
                })}
            </ul>
            <Button addStyle="min-w-[300px]" text="Каталог напитков" theme="yellow" onClick={_ => navigate("/")}/>
        </div>
    )
}