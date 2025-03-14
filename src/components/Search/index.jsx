import { Input } from "../ui/Input"

export const Search = ({ value, onChange }) => {
    return (
        <Input
            type="text"
            onChange={(e) => onChange(e.target.value)}
            placeholder="Поиск по названию"
            value={value}
        />
    );
};
