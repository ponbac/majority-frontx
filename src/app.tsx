import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FadeInDiv from "./components/FadeInDiv";
import StartMenu from "./components/StartMenu";
import { selectInGame } from "./features/auth/gameSlice";
import { useAppSelector } from "./features/store";
import { SERVER_URL } from "./utils/constants";
import Game, { StartAction } from "./views/game";

const Head = () => {
  return (
    <Helmet>
      <title>[Smälta in]</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

const App: FC<{}> = () => {
  const inGame = useAppSelector(selectInGame);
  const [startAction, setStartAction] = useState<StartAction>();
  const [name, setName] = useState<string>();
  const [roomId, setRoomId] = useState<string>();
  const [nQuestions, setNQuestions] = useState<string>();

  // Ping to wake up server
  useEffect(() => {
    fetch(SERVER_URL);
  }, []);

  return (
    <FadeInDiv className="min-h-screen">
      <Head />
      <div className="flex flex-col flex-0 justify-center items-center min-h-screen">
        {!inGame && (
          <>
            <p
              className="mb-2 font-novaMono text-8xl lg:text-8xl font-bold text-center px-2"
              style={{ textShadow: "2px 2px black" }}
            >
              SMÄLTA IN
            </p>
            <StartMenu
              startAction={startAction}
              setStartAction={setStartAction}
              name={name ?? ""}
              setName={setName}
              roomId={roomId ?? ""}
              setRoomId={setRoomId}
              nQuestions={nQuestions ?? ""}
              setNQuestions={setNQuestions}
            />
          </>
        )}
        {inGame && startAction == StartAction.NEW_GAME && name && (
          <Game startAction={startAction} name={name} nQuestions={nQuestions} />
        )}
        {inGame && startAction == StartAction.JOIN_GAME && name && roomId && (
          <Game startAction={startAction} name={name} roomId={roomId} />
        )}
      </div>
    </FadeInDiv>
  );
};

export default App;
