import { useState } from "react";
import type { CoinValue } from "../../models/types";
import { Coin } from "../Coin";
import { Counter } from "../Counter";

export type TOrderItemProps = {
    value: CoinValue,
    onAmountChange: (cnt: number) => void
}

export const CoinItem = ({ value, onAmountChange }: TOrderItemProps) => {
    const [amount, setAmount] = useState<number>(0);
    return (
        <tr className="h-full">
            <td className="p-0">
               <Coin value={value}/>
            </td>
            <td className="align-middle text-[22px]">
                <p>{value} рубль</p>
            </td>
            <td className="align-middle">
                <Counter
                    initial={amount}
                    min={0}
                    max={1000000}
                    onChange={(v) => {
                        if(amount == v)
                            return
                        setAmount(v);
                        onAmountChange(v);
                    }}
                />
            </td>
            <td className="align-middle">
                <p className="text-center text-[22px]">{value * amount + " руб."}</p>
            </td>
        </tr>
    )
}