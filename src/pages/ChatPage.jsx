import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import client from "../lib/chatClient";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import toast from "react-hot-toast";
import ChatLoader from "../components/CLoader";
import CallButton from "../components/CButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export default function ChatPage() {
  const { id: targetUserId } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    let isMounted = true;

    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        // connect as current user (reuse connection if already same)
        if (client?.userID !== authUser._id.toString()) {
          if (client.userID) await client.disconnectUser();
          await client.connectUser(
            {
              id: authUser._id.toString(),
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          );
        }

        // deterministic channel id for 1:1 chat
        const sortedIds = [authUser._id.toString(), targetUserId.toString()].sort();
        const channelId = sortedIds.join("-");

        const ch = client.channel("messaging", channelId, { members: sortedIds });
        await ch.watch();
        if (isMounted) setChannel(ch);
      } catch (err) {
        console.error(err);
        toast.error("Could not connect to chat");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initChat();
    return () => { isMounted = false; };
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;
    const callUrl = `${window.location.origin}/call/${channel.id}`;
    channel.sendMessage({ text: `I've started a video call. Join me here: ${callUrl}` });
    toast.success("Video call link sent!");
  };

  if (loading || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={client} theme="str-chat__theme-light">
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
