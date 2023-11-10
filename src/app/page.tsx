"use client";

import React, { useState, useEffect } from "react";
import { CompletedGoals } from "./interfaces";
import data from "./data.json";

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<keyof typeof data>("bosses");
  const [showCompleted, setShowCompleted] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  // Handler for search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function toggleShowCompleted() {
    setShowCompleted((prevShowCompleted) => !prevShowCompleted);
  }

  const [completedGoals, setCompletedGoals] = useState<CompletedGoals>({
    achievements: [],
    weapons: [],
    armors: [],
    bosses: [],
    gestures: [],
  });

  useEffect(() => {
    const savedGoals = localStorage.getItem("completedGoals");

    if (savedGoals) {
      setCompletedGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completedGoals", JSON.stringify(completedGoals));
  }, [completedGoals]);

  const handleUpdateProgress = (
    tabName: keyof CompletedGoals,
    itemName: string,
    isCompleted: boolean
  ) => {
    setCompletedGoals((prevGoals) => {
      const updatedGoals = { ...prevGoals };
      if (isCompleted) {
        updatedGoals[tabName] = [...prevGoals[tabName], itemName];
      } else {
        updatedGoals[tabName] = prevGoals[tabName].filter(
          (name) => name !== itemName
        );
      }
      localStorage.setItem("completedGoals", JSON.stringify(updatedGoals));
      return updatedGoals;
    });
  };

  const renderTab = (tabName: keyof CompletedGoals) => {
    const tabItems = data[tabName];
    const completedItems = completedGoals[tabName];
    const totalItems = tabItems.length;
    const completedCount = tabItems.filter((item) =>
      completedItems.includes(item.name)
    ).length;

    const filteredItems = searchTerm
      ? tabItems.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : tabItems;

    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <h2>
          {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
          {"  "}
          <span
            className={completedCount == totalItems ? "done" : "in-progress"}
          >
            {completedCount == totalItems
              ? "DONE"
              : `${completedCount}/${totalItems}`}
          </span>
          <button onClick={toggleShowCompleted}>
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </button>
        </h2>
        <ul>
          {filteredItems.map((item) => {
            const isCompleted = completedItems.includes(item.name);

            if (!showCompleted && isCompleted) {
              return null;
            }

            return (
              <li key={item.name} className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) =>
                      handleUpdateProgress(tabName, item.name, e.target.checked)
                    }
                  />
                  <span
                    onClick={() =>
                      handleUpdateProgress(tabName, item.name, !isCompleted)
                    }
                  >
                    <a
                      href={item.wiki_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.name}
                    </a>
                    <p>{item.description}</p>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Game 100% Checklist</h1>
      <button onClick={() => setActiveTab("achievements")}>Achievements</button>
      <button onClick={() => setActiveTab("bosses")}>Bosses</button>
      <button onClick={() => setActiveTab("weapons")}>Weapons</button>
      <button onClick={() => setActiveTab("armors")}>Armors</button>
      {renderTab(activeTab)}
    </div>
  );
}

export default App;
