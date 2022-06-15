import { motion } from "framer-motion";
import { castImmutable } from "immer";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useWebSocket, { SendMessage } from "react-use-websocket";
import {
  newGameState,
  selectCurrentQuestion,
  selectName,
  selectRoom,
  setName,
} from "../features/auth/gameSlice";
import { useAppDispatch, useAppSelector } from "../features/store";
import { SERVER_URL } from "../utils/constants";

const voteButton = (text: string, value: number, sendMessage: SendMessage) => (
  <button
    className="bg-primary text-secondary w-28 h-8 rounded-xl hover:bg-primaryLight hover:text-secondaryLight transition-all"
    onClick={() => {
      sendMessage(JSON.stringify({ action: "Vote", value: value }));
    }}
  >
    {text}
  </button>
);

const Question: FC<{ question: Question }> = ({ question }) => {
  return <p className="text-xl">{question.description}</p>;
};

export enum StartAction {
  JOIN_GAME,
  NEW_GAME,
}
const Game: FC<{ startAction: StartAction; name: string; roomId?: string }> = ({
  startAction,
  name,
  roomId,
}) => {
  const startQuery =
    startAction === StartAction.JOIN_GAME
      ? `/join?room=${roomId}&name=${name}`
      : `/new?name=${name}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${SERVER_URL}${startQuery}`
  );
  const room = useAppSelector(selectRoom);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const stateName = useAppSelector(selectName);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!stateName) {
      dispatch(setName(name));
    }
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      const gameState: Room = JSON.parse(lastMessage.data);
      dispatch(newGameState(gameState));
      //console.log(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);

  useEffect(() => {
    console.log(currentQuestion);
  }, [currentQuestion]);

  if (room) {
    return (
      <motion.div
        className="min-h-screen font-novaMono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col flex-0 justify-center items-center pt-20 gap-4">
          <p className="text-4xl font-bold">{stateName}</p>
          {currentQuestion && <Question question={currentQuestion} />}
          <div className="flex flex-row gap-12">
            {voteButton("1", 1, sendMessage)}
            {voteButton("2", 2, sendMessage)}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen font-novaMono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col flex-0 justify-center items-center pt-20">
        <p className="text-4xl font-bold">
          SOMETHING WENT WRONG, INVALID ROOM!
        </p>
      </div>
    </motion.div>
  );
};

export default Game;
