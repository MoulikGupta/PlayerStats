import React, { useContext, useState } from 'react';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import "../css/playersearch.css";
import { CategoryContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router';

function PlayerSearch() {
    const [input, setInput] = useState("");
    const [sortedPlayers, setSortedPlayers] = useState(null);
    const { players } = useContext(CategoryContext);
    const navigate = useNavigate();

    const getFilteredList = () => {
        return players?.filter((player) =>
            player?.username.toLowerCase().includes(input.toLowerCase())
        ) || [];
    };
    const sortAscending = () => {
        const sorted = [...getFilteredList()].sort((a, b) =>
            a.username.localeCompare(b.username)
        );
        setSortedPlayers(sorted);
    };

    const sortDescending = () => {
        const sorted = [...getFilteredList()].sort((a, b) =>
            b.username.localeCompare(a.username)
        );
        setSortedPlayers(sorted);
    };
    const displayList = sortedPlayers ?? getFilteredList();

    return (
        <div className='search-cont'>
            <div className='topsearch-bar'>
                <span className="sort">
                    <ArrowDropUpRoundedIcon fontSize='large' className='sort-icon'
                        onClick={sortAscending} />
                    <ArrowDropDownRoundedIcon fontSize='large' className="sort-icon"
                        onClick={sortDescending} />
                </span>
                <span className='searchBar'>
                    <input type="text" className='textbox' value={input}
                        onChange={(event) => {
                            setInput(event.target.value);
                            setSortedPlayers(null);
                        }}
                    />
                    <SearchRoundedIcon className='search-icon' />
                </span>
            </div>
            <div className='player-list-card'>
                {displayList.length > 0 ? 
                    displayList.map((player) => (
                        <div key={player.player_id} className='player-card'>
                            <h1> {player.username} </h1>
                            <div
                                className="rounded-3xl p-2 w-20 text-center bg-blue-400 font-medium hover:bg-amber-700 duration-200 cursor-pointer"
                                onClick={() => navigate(`/player/${player.player_id}`)}
                            >
                                <button className="cursor-pointer">View</button>
                            </div>
                        </div>
                    ))
                : (
                    <div className='player-card'>
                        <h1> No Player Found </h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayerSearch;