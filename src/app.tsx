import { FC, useState } from "react";
import { Helmet } from "react-helmet";
import FadeInDiv from "./components/FadeInDiv";
import StartMenu from "./components/StartMenu";
import { selectInGame } from "./features/auth/gameSlice";
import { useAppSelector } from "./features/store";
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

  return (
    <FadeInDiv className="min-h-screen">
      <Head />
      <div className="flex flex-col flex-0 justify-center items-center pt-20">
        <p className="font-novaMono text-8xl font-bold text-center">
          SMÄLTA IN
        </p>
        {!inGame && (
          <StartMenu
            setStartAction={setStartAction}
            name={name ?? ""}
            setName={setName}
            roomId={roomId ?? ""}
            setRoomId={setRoomId}
          />
        )}
        {inGame && startAction == StartAction.NEW_GAME && name && (
          <Game startAction={startAction} name={name} />
        )}
        {inGame && startAction == StartAction.JOIN_GAME && name && roomId && (
          <Game startAction={startAction} name={name} roomId={roomId} />
        )}
      </div>
    </FadeInDiv>
  );
};

export default App;
