import React from "react"; // Assuming interfaces are defined in 'interfaces.ts'
import WikiLink from "./WikiLink";
import { Item } from "../types/interfaces";

interface GoalProps {
    item: Item;
    updateProgress: Function;
    isCompleted: boolean;
}

function Goal({ item, updateProgress, isCompleted }: Readonly<GoalProps>) {
    return (
        <li key={item.name} className="checkbox">
            <label onClick={() => updateProgress(item.name)}>
                <input type="checkbox" checked={isCompleted} readOnly />
                <span>
                    <WikiLink name={item.name} url={item.wiki_link} />
                    <p>{item.description}</p>
                </span>
            </label>
        </li>
    );
}

export default Goal;
