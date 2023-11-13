import { Dispatch, SetStateAction, useState } from "react";
import { CategoryName, Item, ISubcategory } from "../types/interfaces";
import { NAMES, SUBCATEGORIES_NAMES } from "../utils/names";
import Searchbar from "./Searchbar";
import WikiLink from "./WikiLink";
import Goal from "./GoalItem";

interface Props {
    name: CategoryName;
    items: Item[] | ISubcategory;
    completedGoals: string[];
    setCompletedGoals: Dispatch<SetStateAction<string[]>>;
}

function Tab({ name, items, completedGoals, setCompletedGoals }: Readonly<Props>) {
    const [showCompleted, setShowCompleted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    function toggleShowCompleted() {
        setShowCompleted((prevShowCompleted) => !prevShowCompleted);
    }

    function handleUpdateProgress(item: string) {
        if (!completedGoals.includes(item)) {
            setCompletedGoals([...completedGoals, item]);
        } else {
            setCompletedGoals([...completedGoals].filter((name) => name != item));
        }
    }

    function filterSearch(itemsToFilter: Item[]) {
        return itemsToFilter.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Render items based on their type
    function renderItems() {
        if (Array.isArray(items)) {
            const filteredItems = searchTerm ? filterSearch(items) : items;
            return renderItemList(filteredItems);
        } else {
            return Object.entries(items).map(([subcategory, subItems]) => {
                const filteredItems = searchTerm ? filterSearch(subItems) : subItems;
                const totalItems = filteredItems.length;

                const completedCount = filteredItems.filter((item: Item) =>
                    completedGoals.includes(item.name)
                ).length;

                if (totalItems == 0) return;
                if (totalItems == completedCount && !showCompleted) return;

                return (
                    <div key={subcategory}>
                        <h2>
                            {
                                SUBCATEGORIES_NAMES[
                                    subcategory as keyof typeof SUBCATEGORIES_NAMES
                                ]
                            }
                            <span
                                className={
                                    completedCount == totalItems ? "done" : "in-progress"
                                }
                            >
                                {completedCount == totalItems
                                    ? "DONE"
                                    : `${completedCount}/${totalItems}`}
                            </span>
                        </h2>
                        {filteredItems.map((item) => {
                            const isCompleted = completedGoals.includes(item.name);
                            if (!showCompleted && isCompleted) return null;

                            return (
                                <Goal
                                    key={item.name}
                                    item={item}
                                    updateProgress={handleUpdateProgress}
                                    isCompleted={isCompleted}
                                />
                            );
                        })}
                    </div>
                );
            });
        }
    }

    function renderItemList(filteredItems: Item[]) {
        return (
            <ul>
                {filteredItems.map((item) => {
                    const isCompleted = completedGoals.includes(item.name);
                    if (!showCompleted && isCompleted) return null;

                    return (
                        <li key={item.name} className="checkbox">
                            <label onClick={() => handleUpdateProgress(item.name)}>
                                <input type="checkbox" checked={isCompleted} readOnly />
                                <span>
                                    <WikiLink name={item.name} url={item.wiki_link} />
                                    <p>{item.description}</p>
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        );
    }

    const allItems = Object.values(items).flat();

    const totalItems = allItems.length;
    const completedCount = allItems.filter((item) =>
        completedGoals.includes(item.name)
    ).length;

    return (
        <div>
            <button onClick={toggleShowCompleted} className="hide-button">
                {showCompleted ? "Hide Completed" : "Show Completed"}
            </button>
            <h2>
                {NAMES[name]}
                <span className={completedCount == totalItems ? "done" : "in-progress"}>
                    {completedCount == totalItems
                        ? "DONE"
                        : `${completedCount}/${totalItems}`}
                </span>
            </h2>
            <Searchbar handleSearchChange={handleSearchChange} />
            {renderItems()}
            {/* <ul>
                {filteredItems.map((item) => {
                    const isCompleted = completedGoals.includes(item.name);
                    if (!showCompleted && isCompleted) return null;

                    return (
                        <li key={item.name} className="checkbox">
                            <label onClick={() => handleUpdateProgress(item.name)}>
                                <input type="checkbox" checked={isCompleted} />
                                <span>
                                    <WikiLink name={item.name} url={item.wiki_link} />
                                    <p>{item.description}</p>
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul> */}
        </div>
    );
}

export default Tab;
