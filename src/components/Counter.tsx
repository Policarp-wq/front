import { useState, useEffect } from "react"

export type TCounterProps = {
    initial: number,
    min: number,
    max: number,
    onChange?: (value: number) => void
}

export const Counter = ({initial, min, max, onChange} : TCounterProps) => {
    const [cnt, setCnt] = useState<number>(initial);

    useEffect(() => {
        if (onChange) onChange(cnt);
    }, [cnt, onChange]);

    const handleDecrease = () => {
        if(cnt > min)
            setCnt(cnt - 1);
    }
    const handleIncrease = () => {
        if(cnt < max)
            setCnt(cnt + 1);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        if (isNaN(value)) value = min;
        if (value < min) value = min;
        if (value > max) value = max;
        setCnt(value);
    };

    return (
        <div className="flex flex-row justify-center gap-[10px]">
            <button
                onClick={handleDecrease}
                disabled={cnt <= min}
                className="w-8 h-8 flex items-center justify-center bg-black text-white text-xl rounded hover:bg-blue-900"
            >-</button>
            <input
                type="text"
                value={cnt}
                min={min}
                max={max}
                onChange={handleInputChange}
                className="bg-gray-200 w-[100px] text-center"
            />
            <button
                onClick={handleIncrease}
                disabled={cnt >= max}
                className="w-8 h-8 flex items-center justify-center bg-black text-white text-xl rounded hover:bg-blue-900"
            >+</button>
        </div>
    )
}