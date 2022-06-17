import { useState } from "react";
import { startGame } from "../features/auth/gameSlice";
import { useAppDispatch } from "../features/store";
import { StartAction } from "../views/game";

type StartMenuProps = {
  setStartAction: React.Dispatch<React.SetStateAction<StartAction | undefined>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const StartMenu = (props: StartMenuProps) => {
  const { setStartAction, setName, name, setRoomId, roomId } = props;
  const [displayNameSelect, setDisplayNameSelect] = useState(false);
  const dispatch = useAppDispatch();

  if (displayNameSelect) {
    return (
      <div className="pt-16 flex flex-col justify-center items-center font-novaMono">
        <div className="flex border-2 border-primary rounded bg-primary text-black w-56">
          <input
            type="text"
            className="px-2 py-2 w-full outline-none text-secondary font-bold"
            value={name}
            onChange={(event) => {
              if (event.currentTarget.value.length <= 16) {
                setName(event.currentTarget.value);
              }
            }}
            placeholder="Namn"
          />
        </div>
        <div className="pt-2 space-x-3">
          <button
            onClick={() => {
              if (name.length > 0) {
                dispatch(startGame());
              }
            }}
            className="bg-primary text-secondary p-2 rounded-xl font-bold w-28 hover:w-32 hover:bg-primaryLight hover:text-secondaryLight transition-all"
          >
            Starta!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 flex flex-col justify-center items-center font-novaMono">
      <div className="flex border-2 border-primary rounded bg-primary text-black w-56">
        <button className="flex items-center justify-center px-2 border-r border-gray-300">
          <svg
            className="w-6 h-6 text-secondary"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M8.114 2.094a.75.75 0 01.386.656V9h1.252a.75.75 0 110 1.5H5.75a.75.75 0 010-1.5H7V4.103l-.853.533a.75.75 0 01-.795-1.272l2-1.25a.75.75 0 01.762-.02zm4.889 5.66a.75.75 0 01.75-.75h5.232a.75.75 0 01.53 1.28l-2.776 2.777c.55.097 1.057.253 1.492.483.905.477 1.504 1.284 1.504 2.418 0 .966-.471 1.75-1.172 2.27-.687.511-1.587.77-2.521.77-1.367 0-2.274-.528-2.667-.756a.75.75 0 01.755-1.297c.331.193.953.553 1.912.553.673 0 1.243-.188 1.627-.473.37-.275.566-.635.566-1.067 0-.5-.219-.836-.703-1.091-.538-.284-1.375-.443-2.471-.443a.75.75 0 01-.53-1.28l2.643-2.644h-3.421a.75.75 0 01-.75-.75zM7.88 15.215a1.4 1.4 0 00-1.446.83.75.75 0 01-1.37-.61 2.9 2.9 0 012.986-1.71 2.565 2.565 0 011.557.743c.434.446.685 1.058.685 1.778 0 1.641-1.254 2.437-2.12 2.986-.538.341-1.18.694-1.495 1.273H9.75a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75c0-1.799 1.337-2.63 2.243-3.21 1.032-.659 1.55-1.031 1.55-1.8 0-.355-.116-.584-.26-.732a1.068 1.068 0 00-.652-.298z"></path>
          </svg>
        </button>
        <input
          type="text"
          className="px-4 py-2 w-full outline-none text-secondary font-bold"
          value={roomId}
          onChange={(event) => {
            if (event.currentTarget.value.length <= 4) {
              setRoomId(event.currentTarget.value.toUpperCase());
            }
          }}
          placeholder="Rumskod"
        />
      </div>
      <div className="pt-4 space-x-3">
        <button
          onClick={() => {
            setStartAction(StartAction.NEW_GAME);
            setDisplayNameSelect(true);
          }}
          className="bg-primary text-secondary p-2 rounded-xl font-bold w-40 hover:w-44 hover:bg-primaryLight hover:text-secondaryLight transition-all"
        >
          Skapa nytt rum
        </button>
        <button
          onClick={() => {
            if (roomId.length == 4) {
              setStartAction(StartAction.JOIN_GAME);
              setDisplayNameSelect(true);
            }
          }}
          className="bg-primary text-secondary p-2 rounded-xl font-bold w-40 hover:w-44 hover:bg-primaryLight hover:text-secondaryLight transition-all"
        >
          Anslut till rum
        </button>
      </div>
    </div>
  );
};

export default StartMenu;