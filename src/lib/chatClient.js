import { StreamChat } from "stream-chat";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
if (!STREAM_API_KEY) {
  // Optional: throw or warn – avoids silent failures
  // eslint-disable-next-line no-console
  console.warn("Missing VITE_STREAM_API_KEY in frontend/.env");
}

const client = StreamChat.getInstance(STREAM_API_KEY);
export default client;
