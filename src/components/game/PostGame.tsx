import { exitGame, newGameState } from "../../features/auth/gameSlice";
import { useAppDispatch } from "../../features/store";

type PostGameProps = {
  room: Room;
};
const PostGame = (props: PostGameProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="text-center">
      <h1>Spelet är slut!</h1>
      <button
        className="mt-4 bg-primary text-secondary p-2 rounded-xl font-bold w-40 hover:w-44 hover:bg-primaryLight hover:text-secondaryLight transition-all"
        onClick={() => {
          dispatch(exitGame());
        }}
      >
        Tillbaka till start!
      </button>
    </div>
  );
};

export default PostGame;
