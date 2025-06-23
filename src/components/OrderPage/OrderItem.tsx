import { useState } from "react"
import { Counter } from "../Counter";

export type TOrderItemProps = {
    image: string,
    name: string,
    amount: number,
    maxAmount: number,
    price: number,
    onDelete: () => void,
    onAmountChange: (cnt: number) => void
}

export const OrderItem = ({ image, name, amount: initialAmount, maxAmount, price, onDelete, onAmountChange }: TOrderItemProps) => {
    const [amount, setAmount] = useState<number>(initialAmount);
    return (
        <tr className="h-full">
            <td className="p-0">
                <div className="h-full w-full mt-2 mb-2">
                    <img className="h-[100px] w-full object-contain" src={image} alt={name}/>
                </div>
            </td>
            <td className="align-middle text-[22px]">
                <p>{name}</p>
            </td>
            <td className="align-middle">
                <Counter
                    initial={amount}
                    min={1}
                    max={maxAmount}
                    onChange={(v) => {
                        setAmount(v);
                        onAmountChange(v);
                    }}
                />
            </td>
            <td className="align-middle">
                <p className="text-center text-[22px]">{price * amount + " руб."}</p>
            </td>
            <td className="align-middle">
                <div className="flex justify-end h-full">
                    <button onClick={() => onDelete()} className=" h-full">
                        <img
                            className="w-[48px] object-contain"
                            src="https://cdn-icons-png.flaticon.com/512/10319/10319444.png"
                            alt="delete"
                        />
                    </button>
                </div>
            </td>
        </tr>
    )
}