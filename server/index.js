const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(cors());
app.use(express.json());
  



// Create a Player
app.post("/players", async (req, res) => {
    try {
        const { username, age, profile_picture } = req.body;
        const query = "INSERT INTO Players (username, age, profile_picture) VALUES (?, ?, ?)";
        const [result] = await pool.query(query, [username, age, profile_picture]);
        
        const [newPlayer] = await pool.query("SELECT * FROM Players WHERE player_id = LAST_INSERT_ID()");
        res.json(newPlayer[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});

// Add a Game
app.post("/games", async (req, res) => {
    try {
        const { game_name } = req.body;
        const query = "INSERT INTO Games (game_name) VALUES (?)";
        const [result] = await pool.query(query, [game_name]);
        
        const [newGame] = await pool.query("SELECT * FROM Games WHERE game_id = LAST_INSERT_ID()");
        res.json(newGame[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});

// Add Player Stats
app.post("/player_stats", async (req, res) => {
    try {
        const { player_id, game_id, hours_played, matches_played } = req.body;
        const query = `
            INSERT INTO Player_Stats (player_id, game_id, hours_played, matches_played) 
            VALUES (?, ?, ?, ?)
        `;
        await pool.query(query, [player_id, game_id, hours_played, matches_played]);

        const [newStats] = await pool.query("SELECT * FROM Player_Stats WHERE player_id = ? AND game_id = ?", [player_id, game_id]);
        res.json(newStats[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});

// Add Player Achievements
app.post("/player_achievements", async (req, res) => {
    try {
        const { player_id, achievement_name, description } = req.body;
        const query = `
            INSERT INTO Player_Achievements (player_id, achievement_name, description) 
            VALUES (?, ?, ?)
        `;
        await pool.query(query, [player_id, achievement_name, description]);

        const [newAchievement] = await pool.query("SELECT * FROM Player_Achievements WHERE player_id = ? AND achievement_name = ?", [player_id, achievement_name]);
        res.json(newAchievement[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});

// Get All Players
app.get("/players", async (req, res) => {
    try {
        const [players] = await pool.query("SELECT * FROM Players");
        res.json(players);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// Get a Single Player
app.get("/players/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [player] = await pool.query("SELECT * FROM Players WHERE player_id = ?", [id]);

        if (player.length === 0) {
            return res.status(404).json({ message: "Player not found" });
        }
        
        res.json(player[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});

// Get Player Profile
app.get("/players/:id/profile", async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                p.player_id, 
                p.username, 
                p.age, 
                p.profile_picture,
                COALESCE(ps.stats, JSON_ARRAY()) AS stats,
                COALESCE(pa.achievements, JSON_ARRAY()) AS achievements
            FROM Players p
            LEFT JOIN (
                SELECT player_id, JSON_ARRAYAGG(stats_json) AS stats
                FROM (
                SELECT DISTINCT 
                    player_id,
                    JSON_OBJECT(
                    'game_id', game_id,
                    'hours_played', hours_played,
                    'matches_played', matches_played
                    ) AS stats_json
                FROM Player_Stats
                ) t
                GROUP BY player_id
            ) ps ON p.player_id = ps.player_id
            LEFT JOIN (
                SELECT player_id, JSON_ARRAYAGG(ach_json) AS achievements
                FROM (
                SELECT DISTINCT 
                    player_id,
                    JSON_OBJECT(
                    'achievement_name', achievement_name,
                    'description', description
                    ) AS ach_json
                FROM Player_Achievements
                ) t
                GROUP BY player_id
            ) pa ON p.player_id = pa.player_id
            WHERE p.player_id = ?
            `;

        const [rows] = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});

// Get Player Stats by Game
app.get("/player_stats/game/:game_id", async (req, res) => {
    try {
        const gameId = parseInt(req.params.game_id);
        if (isNaN(gameId)) {
            return res.status(400).json({ error: "Invalid game ID" });
        }

        const [rows] = await pool.query(
            `SELECT ps.*, p.username
            FROM Player_Stats ps 
            JOIN Players p ON ps.player_id = p.player_id
            WHERE ps.game_id = ?`,
            [gameId]
        );

        res.json(rows);
    } catch (err) {
        console.error("Error fetching player stats by game:", err);
        res.status(500).json({ error: err.message });
    }
});

// Get List of Games
app.get("/games", async (req, res) => {
    try {
        const [games] = await pool.query("SELECT * FROM Games ORDER BY game_id");
        res.json(games);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});

// Search Players by Username
app.get("/players/search/:query", async (req, res) => {
    try {
        const { query } = req.params;
        const searchQuery = `%${query}%`;
        const [result] = await pool.query(
            "SELECT * FROM Players WHERE username LIKE ?",
            [searchQuery]
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});
app.use('/', createProxyMiddleware({
    target: 'https://playerstatsviewer-moulik-gupta.onrender.com', // Replace with your client’s URL
    changeOrigin: true,
    pathRewrite: {
        '^/': '', // Remove base path if needed
    },
}));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});