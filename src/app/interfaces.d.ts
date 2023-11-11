interface Item {
  name: string;
  description: string;
  wiki_link: string;
}

interface Category {
  [key: string]: Item[];
}

interface Progress {
  [category: string]: { [itemName: string]: boolean };
}

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

type CompletedGoals = {
  achievements: string[];
  weapons: string[];
  armors: string[];
  bosses: string[];
  gestures: string[];
  rings: string[];
  pendants: string[];
};

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
  Category,
  Item,
};
