import { createContext, useState } from "react";

export const CategoryContext = createContext();

export default function ContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => JSON.parse(localStorage.getItem("isAuthenticated")) || false
      )

    const [category, setCategory] = useState({
        option: "Option",
        optionId: null
    });

    const [data, setData] = useState(() => JSON.parse(localStorage.getItem("user")) || null)

    const [ players, setPlayers ] = useState([]);
    const [ playerStats, setPlayerStats ] = useState([]);
    const [ playerProfile, setPlayerProfile ] = useState([]);

    return (
        <CategoryContext.Provider value={{ category, setCategory, data, setData, isAuthenticated, setIsAuthenticated, playerStats, players, setPlayers, setPlayerStats, playerProfile, setPlayerProfile }}>
            {children}
        </CategoryContext.Provider>
    );
}
 