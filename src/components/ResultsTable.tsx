import { selectCurrentQuestion, selectName } from "../features/auth/gameSlice";
import { useAppSelector } from "../features/store";
import { hasAnswered } from "../utils/utils";

type ResultsTableProps = {
  room: Room;
  className?: string;
};
const ResultsTable = (props: ResultsTableProps) => {
  const { room, className } = props;
  const question = useAppSelector(selectCurrentQuestion);
  const sortedPlayers = [...room.players].sort((a, b) => b.score - a.score);

  return (
    <div className={className}>
      <p className="text-center font-bold text-xl">Tavlan:</p>
      <ul className="text-center">
        {sortedPlayers.map((player) => {
          console.log(question?.group_one);
          if (hasAnswered(player.name, question)) {
            return (
              <p className="text-lg text-green-700 font-bold" key={player.name}>
                {player.name} - {player.score} klunkar
              </p>
            );
          }
          return (
            <p className="text-lg" key={player.name}>
              {player.name} - {player.score} klunkar
            </p>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultsTable;
