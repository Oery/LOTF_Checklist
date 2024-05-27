"use client";

import { useEffect, useState } from "react";
import TabButton from "./components/TabButton";
import Tab from "./components/Tab";
import { CategoryName } from "./types/interfaces";

import armors from "./data/armors.json";
import weapons from "./data/weapons.json";
import rings from "./data/rings.json";
import gestures from "./data/gestures.json";
import pendants from "./data/pendants.json";
import bosses from "./data/bosses.json";
import umbralEyes from "./data/umbral_eyes.json";

function App(): JSX.Element {
    const data = {
        armors,
        weapons,
        rings,
        gestures,
        pendants,
        bosses,
        umbralEyes,
    };

    const [activeTab, setActiveTab] = useState<CategoryName>("bosses");
    const [completedGoals, setCompletedGoals] = useState<string[]>([]);

    // Load Completed Goals
    useEffect(() => {
        const savedGoals = localStorage.getItem("progress");
        if (savedGoals) {
            let savedData = JSON.parse(savedGoals);
            setCompletedGoals(savedData);
        }
    }, []);

    useEffect(() => {
        if (completedGoals.length > 0) {
            localStorage.setItem("progress", JSON.stringify(completedGoals));
        }
    }, [completedGoals]);

    return (
        <div>
            <nav>
                {Object.keys(data).map((key) => (
                    <TabButton
                        key={key}
                        tabName={key as CategoryName}
                        setTab={setActiveTab}
                    />
                ))}
            </nav>

            <h1>Lords Of The Fallen Checklist</h1>

            <Tab
                name={activeTab}
                items={data[activeTab]}
                completedGoals={completedGoals}
                setCompletedGoals={setCompletedGoals}
            />
        </div>
    );
}

export default App;
