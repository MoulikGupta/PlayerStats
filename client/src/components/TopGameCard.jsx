import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import "../css/topplayercard.css";

function TopGameCard() {
  const { playerStats, setPlayerStats } = useContext(CategoryContext);
  const { category } = useContext(CategoryContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPlayersStats = async () => {
    try {
      const response = await fetch(`https://playerstats.onrender.com//player_stats/game/${category.optionId}`);
      const jsonData = await response.json();
      setPlayerStats(jsonData);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  useEffect(() => {
    if (category?.optionId) {
      getPlayersStats();
    }
  }, [category]);

  const filteredPlayers = playerStats
    .filter((playerStat) => playerStat.game_id === category.optionId)
    .sort((a, b) => (b.hours_played + b.matches_played) - (a.hours_played + a.matches_played));

  return (
    <div className="topcardmain pt-4">
      {loading ? (
        <p className="text-gray-200 pl-4">Loading...</p>
      ) : filteredPlayers.length > 0 ? (
        <div className="topcards">
          {filteredPlayers.map((playerStat) => (
            <div
              key={playerStat.player_id}
              className="topcardeach p-4 text-white rounded-lg shadow-lg flex flex-row justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-purple-300">{playerStat.username}</h3>
                <p className="text-sm text-gray-300">Games Played: {playerStat.matches_played}</p>
                <p className="text-sm text-gray-300">Hours Played: {playerStat.hours_played}</p>
                <p className="text-sm text-yellow-500 font-medium">Score: {playerStat.matches_played + playerStat.hours_played}</p>
              </div>
              <div
                className="rounded-3xl p-2 w-20 text-center bg-blue-400 font-medium hover:bg-amber-700 duration-200 cursor-pointer"
                onClick={() => navigate(`/player/${playerStat.player_id}`)}
              >
                <button className="cursor-pointer">View</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-200 pl-4">No players match this category.</p>
      )}
    </div>
  );
}

export default TopGameCard;
