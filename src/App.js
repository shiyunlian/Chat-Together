import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import "./App.css";

const App = () => {
  return (
    <ChatEngine
      height="100vh"
      projectID="9fdef3ba-7b7d-40c2-8efa-179e7dc746ba"
      userName="Elsa" // username from chatengine.io
      userSecret="elsa"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
};

export default App;
