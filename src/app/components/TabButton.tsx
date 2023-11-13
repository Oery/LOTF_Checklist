import { Dispatch, SetStateAction } from "react";
import { CategoryName } from "../types/interfaces";
import { NAMES } from "../utils/names";

interface Props {
    tabName: CategoryName;
    setTab: Dispatch<SetStateAction<CategoryName>>;
}

function TabButton({ tabName, setTab }: Readonly<Props>) {
    return <button onClick={() => setTab(tabName)}>{NAMES[tabName]}</button>;
}

export default TabButton;
