import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useWebSocket from "react-use-websocket";
import { newGameState } from "./features/auth/gameSlice";
import { useAppDispatch } from "./features/store";
import { SERVER_URL } from "./utils/constants";
import Game, { StartAction } from "./views/game";

const Head: FC<{}> = () => {
  return (
    <Helmet>
      <title>Backman - [Smälta in]</title>
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


  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <Head />
      <div className="flex flex-col flex-0 justify-center items-center pt-20">
        <p className="font-novaMono text-8xl font-bold">SMÄLTA IN</p>
        <Game startAction={StartAction.NEW_GAME} name={'Pontus'} />
      </div>
    </motion.div>
  );
};

export default App;
