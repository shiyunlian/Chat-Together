import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import "./App.css";

const App = () => {
  if (!localStorage.getItem("username")) return <LoginForm />;

  return (
    <ChatEngine
      height="100vh"
      projectID="9fdef3ba-7b7d-40c2-8efa-179e7dc746ba" // public API key from chatengine.io project
      userName={localStorage.getItem("username")} // username of a person from chatengine.io project
      userSecret={localStorage.getItem("password")} // a secret for this person and use it to authenticate
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
};

export default App;
