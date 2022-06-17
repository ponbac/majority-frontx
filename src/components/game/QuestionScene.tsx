import { useState } from "react";
import { SendMessage } from "react-use-websocket";
import { selectName } from "../../features/auth/gameSlice";
import { useAppSelector } from "../../features/store";
import { hasAnswered } from "../../utils/utils";
import ResultsTable from "../ResultsTable";

type VoteButtonsProps = {
  question: Question;
  sendMessage: SendMessage;
};
const VoteButtons = (props: VoteButtonsProps) => {
  const name = useAppSelector(selectName);
  const { question, sendMessage } = props;

  const Button = (props: { text: string; value: number }) => (
    <button
      className="font-bold bg-primary disabled:bg-gray-500 text-secondary disabled:text-white w-40 p-2 rounded-xl hover:w-44 hover:bg-primaryLight hover:text-secondaryLight transition-all"
      disabled={hasAnswered(name ?? "", question)}
      onClick={() => {
        sendMessage(JSON.stringify({ action: "Vote", value: props.value }));
      }}
    >
      {props.text}
    </button>
  );

  return (
    <>
      <Button text={question.choices[0]} value={1} />
      <Button text={question.choices[1]} value={2} />
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
      <p className="text-2xl text-center px-4">{question.description}</p>
      <div className="flex flex-row gap-12">
        <VoteButtons question={question} sendMessage={sendMessage} />
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
        <p className="text-center">
          {room.current_question + 1}/{room.questions.length}
        </p>
      </div>
      <Question question={question} sendMessage={sendMessage} />
      <ResultsTable className="pt-8" room={room} whoVoted={true} />
    </>
  );
};

export default QuestionScene;
