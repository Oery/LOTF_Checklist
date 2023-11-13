import { useState } from "react";

interface Props {
    handleSearchChange: Function;
}

function Searchbar({ handleSearchChange }: Readonly<Props>) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <input
            type="text"
            placeholder="Start typing to filter results..."
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearchChange(e);
            }}
        />
    );
}

export default Searchbar;
