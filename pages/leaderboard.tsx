import { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Leaderboard from "../components/Leaderboard";

const LeaderboardPage: NextPage = () => {
  return (
      <>
          <Head>
        <title>Potato Timer</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <div className="w-full h-[70vh] flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold">Cumming soon...</h1>
        <p className="text-xl font-semibold">start racking up hours now they will count</p>
      </div>
      {/* <Leaderboard /> */}

      </>

  );
};

export default LeaderboardPage;
