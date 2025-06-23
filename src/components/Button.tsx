type ButtonProps = {
    text: string;
    addStyle?: string;
    theme: "green" | "yellow" | "gray"
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({ text, addStyle = "", theme, onClick, disabled = false }: ButtonProps) => {
    switch(theme){
        case "gray": addStyle += " bg-gray-300 text-black "; break;
        case "yellow": addStyle += " bg-yellow-500 text-black "; break;
        case "green": addStyle += " bg-green-600 text-white "
    }
    return (
        <button
            className={`block text-center text-[18px] min-h-10 rounded ${addStyle} disabled:opacity-[50%] hover:text-blue-500`}
            onClick={onClick}
            type="button"
            disabled={disabled}
        >
        {text}
    </button>
    )
    
}