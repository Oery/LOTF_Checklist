import { Item } from "../types/interfaces";
import Goal from "./GoalItem";

interface Props {
    name: string;
    items: Item[];
    updateProgress: Function;
    completedGoals: string[];
}

function Subcategory({ name, items, updateProgress, completedGoals }: Readonly<Props>) {
    return (
        <div>
            <h4>{name}</h4>
            {items.map((item) => {
                const isCompleted = completedGoals.some((goal) => goal == item.name);

                return (
                    <Goal
                        key={item.name}
                        item={item}
                        updateProgress={updateProgress}
                        isCompleted={isCompleted}
                    />
                );
            })}
        </div>
    );
}

export default Subcategory;
