type ResultSceneProps = {
  question: Question;
};
const ResultScene = (props: ResultSceneProps) => {
  const { question } = props;

  const losingChoice = () => {
    const groupOneVotes = question.group_one.length;
    const groupTwoVotes = question.group_two.length;

    if (groupOneVotes == groupTwoVotes) {
      return -1;
    }

    return groupOneVotes > groupTwoVotes ? 2 : 1;
  };

  const losingPlayers = () => {
    const group_one = question.group_one;
    const group_two = question.group_two;
    const losingAlternative = losingChoice();

    if (losingAlternative == 1) {
      return group_one;
    } else if (losingAlternative == 2) {
      return group_two;
    }

    return [];
  };

  if (losingChoice() == -1) {
    return (
      <>
        <p className="font-bold text-xl text-center italic mb-4">
          {question.description}
        </p>
        <p className="font-bold text-5xl text-center italic">Oavgjort!</p>
        <p className="mt-5 font-bold text-4xl text-center px-2">
          Alla dricker {question.reward / 2} klunk(ar)!
        </p>
      </>
    );
  }

  return (
    <>
      <p className="font-bold text-xl text-center italic">
        {question.description}
      </p>
      <p className="font-bold text-4xl text-center mb-4 mt-1 text-green-600">
        {losingChoice() == 1 ? question.choices[1] : question.choices[0]}
      </p>
      <p className="font-bold text-2xl text-center">Förlorare:</p>
      <p className="font-bold text-3xl text-center underline decoration-red-500 text-red-700">
        {question.choices[losingChoice() - 1]}
      </p>
      {losingPlayers().length > 0 && (
        <>
          <p className="font-bold text-2xl text-center mt-4">
            Drick {question.reward} klunkar:
          </p>
          {losingPlayers().map((player) => {
            return (
              <p
                className="font-bold text-2xl text-center italic"
                key={player.name}
              >
                {player.name}
              </p>
            );
          })}
        </>
      )}
      {losingPlayers().length == 0 && (
        <>
          <p className="mt-4 font-bold text-5xl text-center px-2">
            Överens, ingen dricker!
          </p>
        </>
      )}
    </>
  );
};

export default ResultScene;