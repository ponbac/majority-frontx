import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useWebSocket, { SendMessage } from "react-use-websocket";
import FadeInDiv from "../components/FadeInDiv";
import PostGame from "../components/game/PostGame";
import PreGame from "../components/game/PreGame";
import QuestionScene from "../components/game/QuestionScene";
import ResultScene from "../components/game/ResultScene";
import {
  newGameState,
  selectCurrentQuestion,
  selectName,
  selectRoom,
  setName,
} from "../features/auth/gameSlice";
import { useAppDispatch, useAppSelector } from "../features/store";
import { SERVER_URL } from "../utils/constants";

export enum StartAction {
  JOIN_GAME,
  NEW_GAME,
}
type GameProps = {
  startAction: StartAction;
  name: string;
  roomId?: string;
};
const Game = (props: GameProps) => {
  const { startAction, name, roomId } = props;

  const startQuery =
    startAction === StartAction.JOIN_GAME
      ? `/join?room=${roomId}&name=${name}`
      : `/new?name=${name}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${SERVER_URL}${startQuery}`
  );
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  const room = useAppSelector(selectRoom);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const stateName = useAppSelector(selectName);

  const dispatch = useAppDispatch();

  const SceneHandler = () => {
    switch (room?.scene) {
      case 0:
        return (
          <PreGame
            isLeader={startAction === StartAction.NEW_GAME ? true : false}
            room={room}
            sendMessage={sendMessage}
          />
        );
      case 1:
        if (currentQuestion && stateName) {
          return (
            <QuestionScene
              question={currentQuestion}
              room={room}
              name={stateName}
              sendMessage={sendMessage}
            />
          );
        }
      case 2:
        if (currentQuestion) {
          return <ResultScene question={currentQuestion} />;
        }
      case 3:
        return <PostGame room={room} />;
      default:
        return <>SceneHandler, ogiltig scen!</>;
    }
  };

  useEffect(() => {
    if (!stateName) {
      dispatch(setName(name));
    }
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      //console.log(lastMessage.data);
      const gameState: Room = JSON.parse(lastMessage.data);
      if (!(gameState.scene == 0 && room?.scene == 3)) {
        dispatch(newGameState(gameState));
      }
      setMessageHistory([...messageHistory, lastMessage.data]);
      //console.log(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);

  if (room) {
    return (
      <FadeInDiv className="min-h-screen font-novaMono" duration={0.5}>
        <div className="flex flex-col flex-0 justify-center items-center pt-20">
          <SceneHandler />
        </div>
      </FadeInDiv>
    );
  }

  return (
    <div className="mt-24 flex justify-center items-center">
      <div className="loading-indicator">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Game;
