type ResultsTableProps = {
  room: Room;
  className?: string;
};
const ResultsTable = (props: ResultsTableProps) => {
  const { room, className } = props;

  return (
    <div className={className}>
      <p className="text-center font-bold text-xl">Tavlan:</p>
      <ul className="text-center">
        {room.players.map((player) => (
          <p className="text-lg">
            {player.name} - {player.score} klunkar
          </p>
        ))}
      </ul>
    </div>
  );
};

export default ResultsTable;
