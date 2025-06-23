import { useState } from "react"

export interface Option {
    name: string,
    value: string
}

export type TDropdownProps = {
    options: Option[],
    onSelect?: (value: string) => void,
    defaultOpt?: Option
}

export const Dropdown = ({options, onSelect, defaultOpt} : TDropdownProps) => {
    const [selected, setSelected] = useState<Option | null>(defaultOpt || null);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const option = options.find(o => o.value === value) || null;
        setSelected(option);
        if(onSelect && option)
            onSelect(option.value);
    };

    return(
        <select className="border-1 border-gray-600 w-full" value={selected?.value || ''} onChange={handleSelect}>
            {options.map(o => (
                <option key={o.value} value={o.value}>{o.name}</option>
            ))}
        </select>
    )
}