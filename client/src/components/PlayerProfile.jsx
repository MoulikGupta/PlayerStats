import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  useTheme 
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { CategoryContext } from "../context/ContextProvider.jsx";

function PlayerProfile() {
  const { id } = useParams(); 
  const { playerProfile, setPlayerProfile } = useContext(CategoryContext);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoBack = () => {
    navigate("/dashboard");
  }

  useEffect(() => {
    const getPlayerProfile = async () => {
      try {
        const response = await fetch(`https://playerstats.onrender.com/players/${id}/profile`);
        const jsonData = await response.json();
        setPlayerProfile(jsonData);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    const gamesName = async () => {
      try {
        const response = await fetch("https://playerstats.onrender.com//games")
        const jsonData = await response.json();
        setGames(jsonData);
      } catch (err) {
        console.error(err);
      }
    }

    if (id){
      gamesName()
      getPlayerProfile()
    }
  },[id])

  const gameStatsData = playerProfile?.stats?.map(stat => {
    const game = games.find(g => g.game_id === stat.game_id);
    return {
      game: game?.game_name || "Unknown",
      hours: stat.hours_played,
      matches: stat.matches_played
    };
  }) || [];

  const gameDistributionData = gameStatsData.map(game => ({
    name: game.game,
    value: game.hours
  }));

  const scatterData = gameStatsData.map(game => ({
    x: game.matches,
    y: game.hours
  }));

  return (
    <div className="h-screen mx-auto bg-gray-900 text-white shadow-2xl overflow-auto">
      {(playerProfile) ? (
        <div className="mx-auto bg-gray-900 text-white shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={playerProfile.profile_picture || '/default-avatar.png'} 
                alt={`${playerProfile.username}'s profile`} 
                className="w-40 h-40 rounded-full border-2 border-white object-cover mr-6"
              />
              <div>
                <h1 className="text-3xl font-bold">{playerProfile.username}</h1>
                <p className="text-gray-200">Age: {playerProfile.age}</p>
              </div>
            </div>
            <button 
              onClick={handleGoBack}
              className="cursor-pointer bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              Go Back
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 p-6 bg-gray-800">
            {playerProfile?.stats?.map((stat, index) => (
              <div 
                key={index} 
                className="bg-gray-700 rounded-lg p-4 text-center transform transition hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2 text-blue-400" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.5a1.5 1.5 0 0 0 0 3h2.5v-3Z"/>
                </svg>
                <h3 className="font-semibold">
                  Game {games.find(g => g.game_id === stat.game_id)?.game_name || "Unknown"}
                </h3>                
                <div className="flex justify-between mt-2">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 text-green-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{stat.hours_played} hrs</span>
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 text-yellow-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span>{stat.matches_played} matches</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-center">Game Statistics Visualizations</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-center mb-4">Hours Played</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={gameStatsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
                    <XAxis dataKey="game" tick={{ fill: 'white' }} axisLine={{ stroke: '#444' }}/>
                    <YAxis tick={{ fill: 'white' }} axisLine={{ stroke: '#444' }}/>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#333', 
                        borderColor: '#555' 
                      }}
                      labelStyle={{ color: 'white' }}
                    />
                    <Bar dataKey="hours" fill="#8884d8" barSize={30}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-center mb-4">Game Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={gameDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {gameDistributionData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`hsl(${index * 360 / gameDistributionData.length}, 70%, 50%)`} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#333', 
                        borderColor: '#555' 
                      }}
                      labelStyle={{ color: 'white' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-center mb-4">Hours vs Matches</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name="Matches" 
                      tick={{ fill: 'white' }} 
                      axisLine={{ stroke: '#444' }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name="Hours" 
                      tick={{ fill: 'white' }} 
                      axisLine={{ stroke: '#444' }}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ 
                        backgroundColor: '#333', 
                        borderColor: '#555' 
                      }}
                      labelStyle={{ color: 'white' }}
                    />
                    <Scatter name="Game Stats" data={scatterData} fill="#82ca9d" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-center">Achievements</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {playerProfile?.achievements?.map((achievement, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
                >
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 text-yellow-500" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <h3 className="text-xl font-semibold">{achievement.achievement_name}</h3>
                  </div>
                  <p className="text-gray-400">{achievement.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Earned on: --
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-center p-6">Player not found!</div>
      )}
    </div>
  )
}

export default PlayerProfile;