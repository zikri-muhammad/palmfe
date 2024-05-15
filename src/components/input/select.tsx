"use client"

interface SelectValue {
    id: number | string;
    name: string;
    flag?: string;
}

interface SelectProps {
    options?: SelectValue[];
    value?: string;
    onChange?: any;
    name: string;
}

const InputSelect: React.FC<SelectProps> = ({ options, value, onChange, name }) => {
    return (
        <select className="bg-neutral-900 appearance-none ring-0 px-4 py-4 focus-visible:ring-0 outline-none w-full capitalize focus-visible:border-0" name={name} value={value} onChange={onChange}>
            {options && options.map((option) => (
                <option className="space-x-2" key={option.id} value={option.id}>
                    {option.flag && option.flag + " "}{option.name}
                </option>
            ))}
        </select>
    );
};

export default InputSelect;