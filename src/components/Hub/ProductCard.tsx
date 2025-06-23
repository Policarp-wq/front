import { useState } from "react";
import { Button } from "../Button";
import { defaultImage } from "../../models/types";

export type TCardState = "sold out" | "selected" | "available";

export type TProductCardProps = {
    image: string | null,
    name: string,
    price: number,
    initState: TCardState,
    onChange: (state: TCardState) => void
}

export const ProductCard = ({image, name, price, onChange, initState = 'available'} : TProductCardProps) => {
    const [state, setState] = useState<TCardState>(initState);
    const getStateText = (s: TCardState) => {
        switch(s){
            case "available": return "Выбрать"
            case "selected": return "Выбрано"
            default: return "Закончился"
        }
    }
    const handleClick = () => {
        const newState: TCardState = state == "available" ? "selected" : "available";
        setState(newState);
        onChange(newState);
    }
    const getTheme = (s: TCardState) => {
        switch(s){
            case "available": return "yellow"
            case "selected": return "green"
            default: return "gray"
        }
    }
    return (
        <li className="flex flex-col border-1 border-gray-300 p-[30px] gap-[16px]">
            <img src={image ?? defaultImage} alt={name} className="object-cover h-[250px] 2xl:h-[325px] w-full"/>
            <h3 className="text-[20px] text-center">{name.length > 0 ? name : "нет названия ("}</h3>
            <p className="text-[20px] text-center">{price + " руб."}</p>
            <Button theme={getTheme(state)} onClick={handleClick} text={getStateText(state)} disabled={state == "sold out"}/>
        </li>
    )
}