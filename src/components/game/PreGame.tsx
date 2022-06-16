import { SendMessage } from "react-use-websocket";

type PreGameProps = {
  isLeader: boolean;
  room: Room;
  sendMessage: SendMessage;
};
const PreGame = (props: PreGameProps) => {
  const { isLeader, room, sendMessage } = props;

  return (
    <>
      <p className="text-center text-4xl">
        Rumskod: <span className="font-bold">{room.id}</span>
      </p>
      <p className="font-bold">Väntar på att spelet ska startas...</p>
      <p className="font-bold text-xl mt-4">Spelare:</p>
      {room.players.map((player) => (
        <p className="font-bold text-lg italic" key={player.name}>
          {player.name}
        </p>
      ))}
      {isLeader && (
        <button
          className="mt-4 bg-primary disabled:bg-gray-500 disabled:text-white text-secondary p-2 rounded-xl font-bold w-32 hover:w-36 hover:bg-primaryLight hover:text-secondaryLight transition-all"
          disabled={room.players.length < 2}
          onClick={() => {
            sendMessage(JSON.stringify({ action: "Start" }));
          }}
        >
          BÖRJA SPELET
        </button>
      )}
    </>
  );
};

export default PreGame;
