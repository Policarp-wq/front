import { useState } from "react"

export type TRangeProps = {
    min: number,
    max: number,
    onChange?: (val: number) => void
}

export const RangeSelector = ({min, max, onChange} : TRangeProps) => {
    const [val, setVal] = useState<number>(min);
    const handleValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = +e.target.value;
        setVal(newVal);
        if(onChange)
            onChange(newVal);
    } 
    return (
    <div className="max-w-[75%] flex flex-col items-center m-0 w-full p-[5px] justify-center gap-[2px]">
        
        <div className="flex flex-row items-center m-0 w-full p-[5px] justify-between">
            <p className="mr-[5px] text-[12px]">{min + " руб."}</p>
            <p className="ml-[5px] text-[12px]">{max + " руб."}</p>
        </div>
        <div className="flex flex-col w-full gap-[15px]">
            <input className="h-[2px] rounded outline-none w-full accent-gray-600" type="range" min={min} max={max} value={val} onChange={handleValChange}/>
            <p className="text-center">{val} руб.</p>
        </div>
       
    </div>
        
    )
}


