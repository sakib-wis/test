// components/CustomSelect.tsx

import React from 'react';
import Select from 'react-select';

type OptionType = {
    value: string;
    label: string;
};

type Props = {
    options: OptionType[];
    onChange: (selectedOption: OptionType | null) => void;
    value: OptionType | null;
    isMulti?: boolean;
};

const CustomSelect: React.FC<Props> = ({ options, onChange, value, isMulti = false }) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            isMulti={isMulti}
            placeholder="Select option"
        />
    );
};

export default CustomSelect;
