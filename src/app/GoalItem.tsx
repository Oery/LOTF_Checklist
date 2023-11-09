import React from "react";
import { GoalItemProps } from "./interfaces"; // Assuming interfaces are defined in 'interfaces.ts'

function GoalItem({
  goal,
  completed,
  onUpdateProgress,
}: GoalItemProps): JSX.Element {
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onUpdateProgress(goal.name, e.target.checked)}
      />
      <a href={goal.wiki_link} target="_blank" rel="noopener noreferrer">
        {goal.name}
      </a>
      <p>{goal.description}</p>
    </div>
  );
}

export default GoalItem;
