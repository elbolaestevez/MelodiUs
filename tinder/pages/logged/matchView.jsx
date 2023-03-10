import React from "react";
import { useSession } from "next-auth/react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import MatchCard from "../../components/MatchCard";
// import { useSelector } from "react-redux";
import ChatCard from "../../components/ChatCard";

const matchView = () => {
  const { data: session, status } = useSession();
  // const user = useSelector((state) => state.user);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      const matches = axios
        .post("/api/match", { email: session.user.email })
        .then((data) => setMatches(data.data));
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div className="h-screen flex flex-col w-full items-center pt-6 bg-black">
        <div className="flex gap-x-3 text-verdespotify items-center mb-6">
          <div className="p-2 h-8 flex mx-auto gap-1">
            <Icon />
            <h6> MelodiUs</h6>
          </div>
        </div>

        <div className="flex w-full justify-left mb-2 ml-4">
          <h5 className="text-lg font-bold leading-none text-verdecito">
            Matches nuevos
          </h5>
        </div>

        <div className="flex w-full overflow-x-auto gap-2 ml-4">
          {matches?.map((match, i) => {
            if (!match.chat.length) {
              return <MatchCard match={match} key={i} i={i} />;
            }
          })}
        </div>

        <div className="flex w-full justify-left mt-4 mb-2 ml-4">
          <h5 className="text-lg font-bold leading-none text-verdecito">
            Mensajes
          </h5>
        </div>

        <div className="flex flex-col w-full gap-2 p-3">
          {matches?.map((match, i) => {
            if (match.chat.length) {
              return <ChatCard match={match} key={i} i={i} />;
            }
          })}
        </div>

        <Navbar></Navbar>
      </div>
    );
  }
};

export default matchView;
