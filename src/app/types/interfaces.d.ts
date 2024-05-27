type CategoryName =
    | "armors"
    | "weapons"
    | "rings"
    | "gestures"
    | "pendants"
    | "bosses"
    | "umbralEyes";

// Assuming Item is already defined
interface Item {
    name: string;
    description: string;
    wiki_link: string;
}

// New Subcategory type
interface ISubcategory {
    [subcategoryName: string]: Item[];
}

// Category type as a union of Item[] and Subcategory
type Category = Item[] | ISubcategory;

interface GoalItemProps {
    goal: Item;
    completed: boolean;
    onUpdateProgress: (itemName: string, completed: boolean) => void;
}

interface CategoryProps {
    name: string;
    items: Item[];
    progress: { [itemName: string]: boolean };
    onUpdateProgress: (itemName: string, completed: boolean) => void;
}

interface TabProps {
    categories: Category;
    progress: Progress;
    onUpdateProgress: (
        categoryName: string,
        itemName: string,
        completed: boolean
    ) => void;
}

interface AppState {
    activeTab: string;
    userProgress: Progress;
}

interface ItemProgress {
    [itemName: string]: boolean;
}

interface SubcategoryProgress {
    [subCategoryName: string]: ItemProgress;
}

interface CategoryProgress {
    [categoryName: string]: ItemProgress | SubcategoryProgress;
}

interface TabProgress {
    [tabName: string]: CategoryProgress;
}

type CompletedGoals = string[];

export {
    CompletedGoals,
    ItemProgress,
    SubcategoryProgress,
    CategoryProgress,
    TabProgress,
    AppState,
    TabProps,
    CategoryProps,
    GoalItemProps,
    Progress,
    CategoryName,
    Item,
    ISubcategory,
};
