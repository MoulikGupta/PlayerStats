import { React, useContext, useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CategoryContext } from '../context/ContextProvider.jsx';

function DropdownCategory() {
  const { category, setCategory } = useContext(CategoryContext);
  const [ fetchedGames, setFetchedGames ] = useState([]);

  const gameCategory = async () => {
    try {
      const response = await fetch("https://playerstats.onrender.com/games");
      const jsonData = await response.json();
      setFetchedGames(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    gameCategory();
  }, []);

  return (
    <div className="dropdown-cata">
      <div className="bg-cata p-4 text-white flex flex-row justify-between align-middle">
        <div className="text-center flex items-center">
          <h2 className="text-lg font-medium">Leaderboard</h2>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="dropdown-menu inline-flex w-50 justify-between gap-x-1.5 rounded-md bg-gray-800 px-3 py-3 text-sm font-semibold text-white shadow-xs hover:bg-gray-700">
              {category.option}
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
            </MenuButton>
          </div>
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden">
            <div className="py-1">
              {fetchedGames.map((eachGame) => (
                <MenuItem
                  key={eachGame.game_id}
                  onClick={() =>
                    setCategory({
                      option: eachGame.game_name,
                      optionId: eachGame.game_id,
                    })
                  }
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white hover:bg-blue-100 hover:text-gray-900"
                  >
                    {eachGame.game_name}
                  </a>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}

export default DropdownCategory;