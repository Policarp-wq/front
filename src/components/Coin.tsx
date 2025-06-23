import type { CoinValue } from "../models/types"

export type TCoinProps = {
    value: CoinValue
}

export const Coin = ({value} : TCoinProps) => {
    return (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-400 text-black text-2xl font-bold m-[16px]">
            {value}
        </div>
    )
}