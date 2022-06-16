import { SendMessage } from "react-use-websocket";
import ResultsTable from "../ResultsTable";

type VoteButtonsProps = {
  choices: string[];
  sendMessage: SendMessage;
};
const VoteButtons = (props: VoteButtonsProps) => {
  const { choices, sendMessage } = props;

  const Button = (props: { text: string; value: number }) => (
    <button
      className="font-bold bg-primary text-secondary w-28 h-8 rounded-xl hover:w-32 hover:bg-primaryLight hover:text-secondaryLight transition-all"
      onClick={() => {
        sendMessage(JSON.stringify({ action: "Vote", value: props.value }));
      }}
    >
      {props.text}
    </button>
  );

  return (
    <>
      <Button text={choices[0]} value={1} />
      <Button text={choices[1]} value={2} />
    </>
  );
};

type QuestionProps = {
  question: Question;
  sendMessage: SendMessage;
};
const Question = (props: QuestionProps) => {
  const { question, sendMessage } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-4">
      <p className="text-2xl text-center">{question.description}</p>
      <div className="flex flex-row gap-12">
        <VoteButtons choices={question.choices} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

type QuestionSceneProps = {
  question: Question;
  room: Room;
  name: string;
  sendMessage: SendMessage;
};
const QuestionScene = (props: QuestionSceneProps) => {
  const { question, room, name, sendMessage } = props;

  return (
    <>
      <div className="">
        <p className="text-center">
          Rumskod: <span className="font-bold">{room.id}</span>
        </p>
      </div>
      <Question question={question} sendMessage={sendMessage} />
      <ResultsTable className="pt-8" room={room} />
    </>
  );
};

export default QuestionScene;
